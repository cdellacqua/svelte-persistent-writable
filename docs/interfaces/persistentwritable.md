[svelte-persistent-writable](../README.md) › [PersistentWritable](persistentwritable.md)

# Interface: PersistentWritable <**T**>

A Writable store that can persist its content to a storage

## Type parameters

▪ **T**

## Hierarchy

* Writable‹T›

  ↳ **PersistentWritable**

## Index

### Properties

* [remove](persistentwritable.md#remove)

### Methods

* [set](persistentwritable.md#set)
* [subscribe](persistentwritable.md#subscribe)
* [update](persistentwritable.md#update)

## Properties

###  remove

• **remove**: *function*

Removes the item from the storage. Note that the underling store value remains untouched

#### Type declaration:

▸ (): *void*

## Methods

###  set

▸ **set**(`value`: T): *void*

*Inherited from [PersistentWritable](persistentwritable.md).[set](persistentwritable.md#set)*

Set value and inform subscribers.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | T | to set  |

**Returns:** *void*

___

###  subscribe

▸ **subscribe**(`run`: Subscriber‹T›, `invalidate?`: Invalidator‹T›): *Unsubscriber*

*Inherited from [PersistentWritable](persistentwritable.md).[subscribe](persistentwritable.md#subscribe)*

Subscribe on value changes.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`run` | Subscriber‹T› | subscription callback |
`invalidate?` | Invalidator‹T› | cleanup callback  |

**Returns:** *Unsubscriber*

___

###  update

▸ **update**(`updater`: Updater‹T›): *void*

*Inherited from [PersistentWritable](persistentwritable.md).[update](persistentwritable.md#update)*

Update value using callback and inform subscribers.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`updater` | Updater‹T› | callback  |

**Returns:** *void*
