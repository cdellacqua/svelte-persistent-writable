[svelte-persistent-writable](../README.md) › [PersistentWritableConfig](persistentwritableconfig.md)

# Interface: PersistentWritableConfig <**T**>

Configuration object used to initialize the Persistent Writable

## Type parameters

▪ **T**

## Hierarchy

* **PersistentWritableConfig**

## Index

### Properties

* [resetOnInitFailure](persistentwritableconfig.md#optional-resetoninitfailure)
* [start](persistentwritableconfig.md#optional-start)
* [storage](persistentwritableconfig.md#storage)

## Properties

### `Optional` resetOnInitFailure

• **resetOnInitFailure**? : *undefined | false | true*

(option, defaults to true) during initialization an Error can be thrown (e.g. when JSON.parse isn't capable of parsing a serialized value in the localStorage)

If true, the error will get caught and the store will be re-initialized as if it weren't ever persisted

Otherwise the error will be thrown

___

### `Optional` start

• **start**? : *undefined | function*

(optional) a start function that will be called once the writable store has at least one subscriber and optionally returns a stop function that will be called
once the store has no remaining subscribers

___

###  storage

• **storage**: *[ItemStorage](itemstorage.md)‹T›*

an ItemStorage
