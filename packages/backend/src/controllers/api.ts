import { Response, Request } from 'express';
import fetch from "node-fetch";

const formatNumber = (num: any) => {
  return ('0' + num).slice(-2);
}

export const getPractitioner = async (req: Request, res: Response) => {
  let pratInf = await fetch('https://api-pat.staging.maiia.com/pat-public/hcd/cards?limit=200&page=0&url=%2Fcabinet-medical%2F75017-paris%2Fcentre-du-dr-charlot');
  let prtRes = await pratInf.text();
  let json = JSON.parse(prtRes);

  let date = new Date();

  //Build date string
  let dStr1 = date.getFullYear() + '-' + formatNumber(date.getMonth() + 1) + '-' + formatNumber(date.getDate() - 5) + 'T' + formatNumber(date.getHours()) + ':' + formatNumber(date.getMinutes()) + ':' + formatNumber(date.getSeconds()) + '.000Z';
  let dStr2 = date.getFullYear() + '-' + formatNumber(date.getMonth() + 1) + '-' + formatNumber(date.getDate() + 5) + 'T' + formatNumber(date.getHours()) + ':' + formatNumber(date.getMinutes()) + ':' + formatNumber(date.getSeconds()) + '.000Z';

  let availabilitis = await fetch('https://api-pat.staging.maiia.com/pat-public/availabilities?centerId=5e5f5c7cbe3ab703219400b1&consultationReasonId=5e620dc259fd677590b75550&from=' + dStr1+ '&limit=2016&page=0&practitionerId=5e5f5b0f71727f4a17554085&specialityId=5dc2f09b5341b80001317e5e&to=' + dStr2);


  const avai = await availabilitis.json();
  res.json({
    prat: json.items[0].center.practitioners[0],
    publicInformation: json.items[0].publicInformation,
    availabilities: avai.items,
  });
};
