[svelte-persistent-writable](../README.md) › [StorageMapper](storagemapper.md)

# Interface: StorageMapper <**T, TSerialized**>

An object providing a serialize and a deserialize method

## Type parameters

▪ **T**

▪ **TSerialized**

## Hierarchy

* **StorageMapper**

## Index

### Properties

* [deserialize](storagemapper.md#deserialize)
* [serialize](storagemapper.md#serialize)

## Properties

###  deserialize

• **deserialize**: *function*

Converts the passed value from TSerialized to T

#### Type declaration:

▸ (`serializedValue`: TSerialized): *T*

**Parameters:**

Name | Type |
------ | ------ |
`serializedValue` | TSerialized |

___

###  serialize

• **serialize**: *function*

Converts the passed value from T to TSerialized

#### Type declaration:

▸ (`value`: T): *TSerialized*

**Parameters:**

Name | Type |
------ | ------ |
`value` | T |
