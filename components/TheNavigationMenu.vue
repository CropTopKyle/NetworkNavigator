<script setup lang="ts">
  import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from '@/components/ui/navigation-menu'
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/"
          class="text-lg"
          :class="navigationMenuTriggerStyle()">
          Home
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/switches"
          class="text-lg"
          :class="navigationMenuTriggerStyle()">
          Switch Lookup
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/vlans"
          class="text-lg"
          :class="navigationMenuTriggerStyle()">
          VLAN Lookup
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
