<template>
  <v-textarea
    outlined
    loader-height="600px"
    name="input-7-4"
    label="控制台信息"
    :value="message"
  ></v-textarea>
</template>

<script>
export default {
    data() {
        return {
            message:[
                "The Woodman set to work at once, and so sharp \n was his axe that the tree was soon chopped nearly through.",
                "hhhhhhh"
                ]
        }
    },
}
</script>