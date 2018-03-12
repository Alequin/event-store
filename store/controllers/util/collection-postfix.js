
const EVENTS = "events"
const SUBSCRIBERS = "subscribers"
const UNPUBLISHED = "unpublished"

function collectionNameFor(type){
  return (stream) => {
    return `${stream}-${type}`
  }
}

module.exports = {
  eventCollectionName: collectionNameFor(EVENTS),
  subscriberCollectionName: collectionNameFor(SUBSCRIBERS),
  unpublishedCollectionName: collectionNameFor(UNPUBLISHED),
}
