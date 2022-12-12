import Link from 'next/link';
import {useRouter} from 'next/router';
import { useEffect } from 'react';

export default function PageNotFound(){
    const router = useRouter();
  useEffect(()=>{
    
    setTimeout(()=>{
        router.replace('/');
    },5000)
  },[]);  
  return (
    <div>
        <h3>Recpie Not Found - 400</h3>
        <Link href="/">Auto redirect 5 sec or use  to go Home</Link>
    </div>
  )
}
