import { Response, Request } from 'express';
import fetch from "node-fetch";

const formatNumber = (num: any) => {
  return ('0' + num).slice(-2);
}

export const getPractitioner = async (req: Request, res: Response) => {
  let pratInf = await fetch('https://pat.staging.maiia.com/api/pat-public/hcd/cards?limit=200&page=0&url=%2Fmedecin-generaliste%2F92500-rueil-malmaison%2Fkieu-anh-tuan');
  let prtRes = await pratInf.text();
  let json = JSON.parse(prtRes);

  let date = new Date();

  //Build date string
  let dStr1 = date.getFullYear() + '-' + formatNumber(date.getMonth() + 1) + '-' + formatNumber(date.getDate() - 1) + 'T' + formatNumber(date.getHours()) + ':' + formatNumber(date.getMinutes()) + ':' + formatNumber(date.getSeconds()) + '.000Z';
  let dStr2 = date.getFullYear() + '-' + formatNumber(date.getMonth() + 1) + '-' + formatNumber(date.getDate() + 1) + 'T' + formatNumber(date.getHours()) + ':' + formatNumber(date.getMinutes()) + ':' + formatNumber(date.getSeconds()) + '.000Z';

  let availabilitis = await fetch('https://pat.staging.maiia.com/api/pat-public/availabilities?centerId=5dd66695061db40001779773&consultationReasonId=5ecba774c8988e1cacb4ddac&from=' + dStr1 + '&limit=10&page=0&practitionerId=5dd668c72e34cc0001dd0688&to=' + dStr2);


  const avai = await availabilitis.json();
  res.json({
    prat: json.items[0].professional,
    publicInformation: json.items[0].publicInformation,
    availabilities: avai.items,
  });
};
