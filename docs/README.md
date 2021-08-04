[svelte-persistent-writable](README.md)

# svelte-persistent-writable

## Index

### Interfaces

* [ItemStorage](interfaces/itemstorage.md)
* [PersistentWritable](interfaces/persistentwritable.md)
* [PersistentWritableConfig](interfaces/persistentwritableconfig.md)
* [StorageMapper](interfaces/storagemapper.md)

### Functions

* [dummyStorageAdapter](README.md#dummystorageadapter)
* [localStorageAdapter](README.md#localstorageadapter)
* [nativeStorageAdapter](README.md#nativestorageadapter)
* [persistentWritable](README.md#persistentwritable)
* [sessionStorageAdapter](README.md#sessionstorageadapter)

## Functions

###  dummyStorageAdapter

▸ **dummyStorageAdapter**<**T**>(): *[ItemStorage](interfaces/itemstorage.md)‹T›*

Generates an dummy ItemStorage that never sets anything and always returns { present: false }

**Type parameters:**

▪ **T**

**Returns:** *[ItemStorage](interfaces/itemstorage.md)‹T›*

an ItemStorage

___

###  localStorageAdapter

▸ **localStorageAdapter**<**T**>(`key`: string, `mapper?`: [StorageMapper](interfaces/storagemapper.md)‹T, string›): *[ItemStorage](interfaces/itemstorage.md)‹T›*

Generates an ItemStorage based on the localStorage

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | the key in the localStorage |
`mapper?` | [StorageMapper](interfaces/storagemapper.md)‹T, string› | (optional) an object containing a serialize and deserialize function. Defaults to JSON.stringify and JSON.parse respectively |

**Returns:** *[ItemStorage](interfaces/itemstorage.md)‹T›*

an ItemStorage

___

###  nativeStorageAdapter

▸ **nativeStorageAdapter**<**T**>(`key`: string, `nativeStorage`: Storage, `mapper?`: [StorageMapper](interfaces/storagemapper.md)‹T, string›): *[ItemStorage](interfaces/itemstorage.md)‹T›*

Generates an ItemStorage based on an implementation of the native Storage API

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | key needed to access the record in the storage |
`nativeStorage` | Storage | localStorage, sessionStorage or any other implementation of the Storage API |
`mapper?` | [StorageMapper](interfaces/storagemapper.md)‹T, string› | (optional) an object containing a serialize and deserialize function |

**Returns:** *[ItemStorage](interfaces/itemstorage.md)‹T›*

an ItemStorage

___

###  persistentWritable

▸ **persistentWritable**<**T**>(`initialValue`: T, `__namedParameters`: object): *[PersistentWritable](interfaces/persistentwritable.md)‹T›*

Creates a Persistent Writable. This Writable store will be initialized with initialValue if
the passed item storage doesn't contain any value, otherwise it will be initialized with the value
found in the item storage

**Type parameters:**

▪ **T**

**Parameters:**

▪ **initialValue**: *T*

the value the store will contain on its first initialization

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`resetOnInitFailure` | undefined &#124; false &#124; true |
`start` | undefined &#124; function |
`storage` | [ItemStorage](interfaces/itemstorage.md)‹T› |

**Returns:** *[PersistentWritable](interfaces/persistentwritable.md)‹T›*

___

###  sessionStorageAdapter

▸ **sessionStorageAdapter**<**T**>(`key`: string, `mapper?`: [StorageMapper](interfaces/storagemapper.md)‹T, string›): *[ItemStorage](interfaces/itemstorage.md)‹T›*

Generates an ItemStorage based on the sessionStorage

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | the key in the sessionStorage |
`mapper?` | [StorageMapper](interfaces/storagemapper.md)‹T, string› | (optional) an object containing a serialize and deserialize function. Defaults to JSON.stringify and JSON.parse respectively |

**Returns:** *[ItemStorage](interfaces/itemstorage.md)‹T›*

an ItemStorage
