<!--{"parserOptions": {"parser":"@typescript-eslint/parser"}}-->
<!-- TODO If ESLint supports the new syntax by default, remove the parser specification and test. -->
<template>
  <div v-bind:a="a
    ??
    b
  "/>
</template>
