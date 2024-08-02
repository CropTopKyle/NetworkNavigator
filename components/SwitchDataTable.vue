<script setup lang="ts">
  import type { ColumnDef, ColumnFiltersState } from '@tanstack/vue-table'
  import {
    FlexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useVueTable,
  } from '@tanstack/vue-table'
  import { h, ref } from 'vue'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'

  interface Switch {
    id: number
    IDF: string
    hostname: string
    location: string
    notes: string
  }

  const data = ref<Switch[]>([])
  const globalFilter = ref('')

  onMounted(async () => {
    try {
      console.log('Attempting to fetch switch data')
      const response = await fetch('/api/switches')
      if (!response.ok) throw new Error('Network response was not ok')
      const result: Switch[] = await response.json()
      data.value = result
      console.log('Fetched data:', data.value)
    } catch (error) {
      console.error('Failed to fetch switch data:', error)
    }
  })

  const columns: ColumnDef<Switch>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('id')),
    },
    {
      accessorKey: 'IDF',
      header: 'IDF',
      cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('IDF')),
    },
    {
      accessorKey: 'hostname',
      header: 'Hostname',
      cell: ({ row }) => h('div', { class: '' }, row.getValue('hostname')),
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) =>
        h('div', { class: 'capitalize' }, row.getValue('location')),
    },
    {
      accessorKey: 'notes',
      header: 'Notes',
      cell: ({ row }) =>
        h('div', { class: 'capitalize' }, row.getValue('notes')),
    },
  ]

  const columnFilters = ref<ColumnFiltersState>([])

  const table = useVueTable({
    get data() {
      return data.value
    },
    columns,
    state: {
      get columnFilters() {
        return columnFilters.value
      },
      get globalFilter() {
        return globalFilter.value
      },
    },
    onColumnFiltersChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        columnFilters.value = updaterOrValue(columnFilters.value)
      } else {
        columnFilters.value = updaterOrValue
      }
    },
    onGlobalFilterChange: (updaterOrValue) => {
      if (typeof updaterOrValue === 'function') {
        globalFilter.value = updaterOrValue(globalFilter.value)
      } else {
        globalFilter.value = updaterOrValue
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const handleGlobalFilter = (value: string | number) => {
    globalFilter.value = String(value)
  }
</script>

<template>
  <div class="w-full">
    <div class="flex gap-2 items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Quick Search..."
        :model-value="globalFilter"
        @update:model-value="handleGlobalFilter" />
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id">
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="font-mono">
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'">
              <TableCell
                v-for="cell in row.getVisibleCells()"
                :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <TableRow v-else>
            <TableCell
              :colspan="columns.length"
              class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
