export default function convertTimeStampStringToDate(string){
  const timeStamp = Number(string)
  const beginDate = new Date(timeStamp)
  return beginDate
}