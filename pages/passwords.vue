<template>
  <PageSection>
    <PageHeader :title="{ text: 'Пароли', route: 'passwords' }" />

    <PageBlock>
      <DataTable :value="store.passwords" :loading="loading" stripedRows showGridlines scrollable scrollHeight="700px">
        <template #header>
          <div class="flex items-center justify-between">
            <span class="text-xl font-bold">Список паролей</span>
            <div class="flex items-center gap-3">
              <v-btn :loading="loading" text="Добавить" :color="colors.primaryBlue.DEFAULT" prepend-icon="mdi-plus" @click="dialog = true" />
              <v-btn icon="mdi-reload" :loading="loading" :color="colors.mainBlack.DEFAULT" size="small" @click="init()" />
            </div>
          </div>
        </template>
        <template #empty><EmptyTable /></template>
        <Column field="id" header="ID"></Column>
        <Column field="title" header="Заголовок"></Column>
        <Column field="password" header="Пароль">
          <template #body="{ data }">
            <div>
              <v-text-field
                :value="data.raw ? store.decrypt(data.password) : data.password"
                :label="data.raw ? 'Исходное значение' : 'Зашифрованное значение'"
                variant="plain"
                readonly
                active
                hide-details
                :type="!data.show ? 'password' : 'text'"
              />
            </div> </template
        ></Column>
        <Column class="w-[5%]">
          <template #body="{ data }">
            <v-menu>
              <template #activator="{ props }">
                <v-btn icon="mdi-dots-horizontal" size="small" variant="plain" v-bind="props" />
              </template>
              <v-list density="compact" :bg-color="colors.mainBlack.DEFAULT">
                <v-list-item :title="!data.show ? 'Показать' : 'Скрыть'" prepend-icon="mdi-eye" class="cursor-pointer" @click="data.show = !data.show" />
                <v-list-item
                  v-if="data.show"
                  :title="data.raw ? 'Зашифровать' : 'Дешифровать'"
                  :prepend-icon="data.raw ? 'mdi-lock-outline' : 'mdi-lock-open-variant-outline'"
                  class="cursor-pointer"
                  @click="data.raw = !data.raw"
                />
                <v-list-item title="Удалить" prepend-icon="mdi-delete-outline" class="cursor-pointer">
                  <Confirm @submit="store.deletePassword(data.id)" />
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </Column>
      </DataTable>
    </PageBlock>
  </PageSection>
  <v-dialog v-model="dialog" width="700">
    <v-card>
      <v-card-title>
        <div class="flex items-center justify-between">
          <span>Добавление пароля</span>
          <v-btn icon="mdi-close" variant="plain" size="small" @click="dialog = false" />
        </div>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" class="flex flex-col gap-4" @submit.prevent="submit">
          <v-text-field v-model.trim="title" label="Заголовок" :rules="[rules.requiredText]" :readonly="loading" />
          <v-text-field
            v-model.trim="password"
            label="Пароль"
            :rules="[rules.requiredText]"
            :readonly="loading"
            :type="!showPassword ? 'password' : 'text'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword"
          />
          <v-btn text="Сохранить" type="submit" :loading="loading" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const { $cookie } = useNuxtApp();
const toast = toaster();
const store = useStore();

const loading = ref<boolean>(true);
const dialog = ref<boolean>(false);
const form = ref();

const title = ref<string>('');
const password = ref<string>('');
const showPassword = ref<boolean>(false);

const submit = useDebounceFn(
  async () => {
    try {
      const { valid } = await form.value.validate();
      if (valid) {
        const { data: passwords } = await store.supabase
          .from('passwords')
          .insert([{ title: title.value, password: store.encrypt(password.value), clientId: $cookie.clientId.get() }])
          .select();
        if (passwords) {
          toast.add({ severity: 'success', summary: 'Операция прошла успешно', life: 2000 });
          title.value = '';
          password.value = '';
          dialog.value = false;
          await store.getPasswords();
        }
      } else {
        toast.add({ severity: 'error', summary: 'Введите данные формы корректно', life: 2000 });
      }
    } catch (e) {
      console.log(e);
    } finally {
      loading.value = false;
    }
  },
  300,
  { maxWait: 5000 },
);

const init = async () => {
  try {
    loading.value = true;
    await store.getPasswords();
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await init();
});
</script>
