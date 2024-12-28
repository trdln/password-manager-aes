import { createClient } from '@supabase/supabase-js';

export const useStore = defineStore('store', () => {
  const { $cookie } = useNuxtApp();

  const supabase = createClient(
    'https://axfrlkbkegqflvdpgoxd.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4ZnJsa2JrZWdxZmx2ZHBnb3hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzMzk0MTIsImV4cCI6MjA1MDkxNTQxMn0.9UNxYtguBXHKo2hT6UkXbDTp-dVYc6eQCjS_oslyNNU',
  );
  const user = ref<User>(new User());

  const logout = () => {
    user.value = new User();
    $cookie.clientId.reset();
    $cookie.token.reset();
    navigateTo({ name: 'auth' });
  };

  const passwords = ref<Types.Password.Self[]>([]);
  const getPasswords = async () => {
    try {
      const { data } = await supabase.from('passwords').select('*').eq('clientId', $cookie.clientId.get());
      if (Array.isArray(data)) passwords.value = data;
    } catch (e) {
      console.log(e);
    }
  };
  const deletePassword = async (id: number) => {
    try {
      const { error } = await supabase.from('passwords').delete().eq('id', id);
      await getPasswords();
    } catch (e) {
      console.log(e);
    }
  };

  const getCryptoPassword = () => {
    const clientId = $cookie.clientId.get();
    if (clientId) {
      const password = clientId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 32);
      console.log('Crypto password: ' + password);
      return password;
    }
    return '';
  };

  const encrypt = (text: string) => {
    const nBits = 256;
    try {
      const password = getCryptoPassword();
      if (password) {
        const encrypted = AesCtr.encrypt(text, password, nBits);
        console.log('Encrypted: ' + encrypted);
        return encrypted;
      } else {
        throw Error('No client id');
      }
    } catch (e) {
      console.log(e);
      return text;
    }
  };

  const decrypt = (text: string) => {
    const nBits = 256;
    try {
      const password = getCryptoPassword();
      if (password) {
        const decrypted = AesCtr.decrypt(text, password, nBits);
        console.log('Decrypted: ' + decrypted);
        return decrypted;
      } else {
        throw Error('No client id');
      }
    } catch (e) {
      console.log(e);
      return text;
    }
  };

  return {
    user,
    logout,

    // Supabase
    supabase,

    // Passwords
    passwords,
    getPasswords,
    deletePassword,
    encrypt,
    decrypt,
  };
});
