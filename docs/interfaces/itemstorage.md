[svelte-persistent-writable](../README.md) › [ItemStorage](itemstorage.md)

# Interface: ItemStorage <**T**>

A single item storage that provides a set of common methods

## Type parameters

▪ **T**

## Hierarchy

* **ItemStorage**

## Index

### Properties

* [get](itemstorage.md#get)
* [remove](itemstorage.md#remove)
* [set](itemstorage.md#set)

## Properties

###  get

• **get**: *function*

If the storage contains a value, it returns it wrapped as { value: ... }
Otherwise it returns null

#### Type declaration:

▸ (): *object | null*

___

###  remove

• **remove**: *function*

Removes the value from the storage

#### Type declaration:

▸ (): *void*

___

###  set

• **set**: *function*

Saves the passed value

#### Type declaration:

▸ (`value`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
