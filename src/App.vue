<template>
  <Disclosure as="nav" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-center">
          <div class="flex space-x-10">
            <router-link to="/" class="text-white bg-blue-700 hover:bg-blue-800 mx-3 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Home</router-link>
            <router-link to="/createemployee" class="text-white bg-blue-700 hover:bg-blue-800 mx-3 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Create Employee</router-link>
            <router-link to="/employeelist" class="text-white bg-blue-700 hover:bg-blue-800 mx-3 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Employee List</router-link>
          </div>
        </div>
      </div>
    </div>
  </Disclosure>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { Disclosure } from '@headlessui/vue'
</script>