const convertjMeterStringsToJsTypes = object => {
  return {
    IdleTime: Number(object.IdleTime),
    Latency: Number(object.Latency),
    allThreads: Number(object.allThreads),
    bytes: Number(object.bytes),
    dataType: object.dataType.toString() + " ",
    elapsed: Number(object.elapsed),
    failureMessage: object.failureMessage.toString() + " ",
    label: object.label.toString() + " ",
    responseCode: Number(object.responseCode),
    responseMessage: object.responseMessage.toString() + " ",
    sentBytes: Number(object.sentBytes),
    success: object.success === "true",
    threadName: object.threadName.toString() + " ",
    timeStamp: object.timeStamp.toString() + " "
  };
};

export default convertjMeterStringsToJsTypes;
