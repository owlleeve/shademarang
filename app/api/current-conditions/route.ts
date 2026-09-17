import {NextResponse} from "next/server";

const points:[string,number,number][]=[
  ["Semarang Tengah",-6.9827,110.4203],["Semarang Utara",-6.9602,110.4225],
  ["Semarang Timur",-6.9845,110.4412],["Genuk",-6.9610,110.4780],
  ["Semarang Selatan",-7.0012,110.4241],["Gayamsari",-6.9890,110.4550],
  ["Candisari",-7.0210,110.4280],["Semarang Barat",-6.9870,110.3890],
  ["Gajahmungkur",-7.0150,110.4070],["Banyumanik",-7.0720,110.4190],
  ["Gunungpati",-7.0850,110.3720],["Mijen",-7.0650,110.3120],
];
type Forecast={current?:{time?:string;temperature_2m?:number}};
export async function GET(){
  const params=new URLSearchParams({latitude:points.map(p=>p[1]).join(","),longitude:points.map(p=>p[2]).join(","),current:"temperature_2m",timezone:"Asia/Bangkok",forecast_days:"1"});
  try{
    const response=await fetch(`https://api.open-meteo.com/v1/forecast?${params}`,{next:{revalidate:900}});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    const data:Forecast[]=await response.json();
    if(!Array.isArray(data))throw new Error("Format respons tidak sesuai");
    const readings=points.flatMap((point,index)=>{
      const c=data[index]?.current;
      return typeof c?.temperature_2m==="number"&&c.time?[{name:point[0],temperature:c.temperature_2m,time:c.time}]:[];
    });
    if(!readings.length)throw new Error("Data suhu belum tersedia");
    return NextResponse.json({readings,source:"Open-Meteo",kind:"suhu udara model pada ketinggian 2 meter",updatedAt:readings[0].time});
  }catch{
    return NextResponse.json({error:"Data terkini belum dapat dimuat"},{status:503});
  }
}
