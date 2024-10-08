'use client'
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { Corben } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'




export default function page() {

  const router=useRouter()

  const [formData, setFormData] = React.useState({
    username:"",
    email:"",
    password:"",
    phoneNumber:"",
  })
  const [errorMessage, setErrorMessage] =React.useState('')
  const [loading, setLoading] = React.useState(false)

  
  const handleChange=(e:any)=>{
      setFormData({...formData,[e.target.id]:e.target.value.trim()});
  
  }
  
  
  const handleSubmit=async(e:any)=>{
        e.preventDefault();
        if(!formData.username  || !formData.email  ||  !formData.password || !formData.phoneNumber  ){
          return setErrorMessage('All field are required to fill')
        }
        try {
          setLoading(true);
          setErrorMessage('');
          const res=await fetch('/api/sign-up',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(formData),
          });
          const data=await res.json();
    
          if(data.success===false){
            return setErrorMessage(data.message);
          }
         
  
          setLoading(false);
          if(res.ok){
             router.push('/login')
          }
  
        } catch (error:any) {
          setErrorMessage(error.message);
          setLoading(false)
        }
  }
  

  


  return (
    <div>
        <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5' >
        {/* left */}
      <div className='flex-1'>
      <Link href="/" className=' font-bold dark:text-white text-4xl' >
        <span className='px-2 py-1 bg-gradient-to-r   from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white '>Note</span>
        Trade
        </Link>
        <p className='text-sm mt-5'>
         You can sign up with your email and password
         

        </p>


      </div>
       {/* right */}

       <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your username'/>
            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>
          </div>


          <div>
            <Label value='Your email'/>
            <TextInput type='email' placeholder='name@gmail.com' id='email' onChange={handleChange}/>
          </div>

          <div>
            <Label value='Your phoneNumber'/>
            <TextInput type='text' placeholder='+91' id='phoneNumber' onChange={handleChange}/>
          </div>



          <div>
            <Label value='Your password'/>
            <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>
          </div>

          <Button className='px-2 py-1 bg-gradient-to-r   from-indigo-500  via-purple-500 to-pink-500 rounded-lg text-white '
           type='submit' disabled={loading}>
         {
          loading ? (
            <>
            <Spinner size='sm'/>
            <span className='pl-3'>Loading...</span>
            </>
          ): 'Sign Up'
         }
          </Button>
       


        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>
            Have an account?
          </span>
          <Link href='/login' className='text-blue-500'>
            Login
          </Link>

        </div>
        {
          errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}

            </Alert>
          )   }



       </div>
      </div>
     
    </div>
    </div>
  )
}
