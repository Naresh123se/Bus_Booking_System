import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/joy/Button';
function Footer() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  return (

    <footer class=" body-font bg-[#F3F4F6]">
      <div class=" px-5 py-10  flex">
        <div class="w-64 ml-14 ">
          <a class="flex ml-2 mb-2 items-center md:justify-start  ">
            <img src="logofinal11.png" className='size-16 mr-4 m' alt="logo" />
            <div class="  text-2xl font-bold flex  ">Bus Booking System</div>
          </a>
          <p className='flex text-justify mt-1 '>Looking for a seamless and efficient way to book your bus tickets? Merobus booking system offers a user-friendly interface and real-time data to ensure you get the best travel experience. Book your next journey with us today and travel smarter!</p>
        </div>
        <div class=" flex gap-28   mt-3 ">
          <div class=" ml-28 ">
            <h2 class="text-lg font-semibold mb-1 text-[#009DF8] ">Quick Links</h2>
            <nav class="list-none mb-10">
              <li>
                <a class="cursor-pointer hover:text-[#757575]"    onClick={() => navigate('/')}>Home</a>
              </li>
              <li>
                <a class="cursor-pointer hover:text-[#757575]" onClick={() => navigate('/bloglist')}>Blog</a>
              </li>
              <li>
                <a class="cursor-pointer hover:text-[#757575]" onClick={() => navigate('/print-ticket')}>Print-Ticket</a>
              </li>
              <li>
                <a class="cursor-pointer hover:text-[#757575]" onClick={() => navigate('/cancel-Ticket')}>Cancel-Ticket</a>
              </li>
             
            </nav>
          </div>
          <div class="  ">
            <h2 class="text-lg font-semibold mb-1 text-[#009DF8] ">Info</h2>
            <nav class="list-none mb-10">
              <li>
                <a class="cursor-pointer hover:text-[#757575]"  onClick={() => navigate('/termCondition')}>T&C</a>
              </li>
              <li>
                <a class="cursor-pointer hover:text-[#757575]"  onClick={() => navigate('/policy')}>Privacy policy</a>
              </li>
              <li>
                <a class="cursor-pointer hover:text-[#757575]"  onClick={() => navigate('/faq')}>FAQ</a>
              </li>
            </nav>
          </div>
          <div class=" ">
            <h2 class="text-lg font-semibold mb-1 text-[#009DF8] ">Contact</h2>
            <nav class="list-none mb-10">
              <li>
              <a href="tel:+977 9829114442" className=" text-[#51519e] ">+977 9829114442</a>
              </li>
              <li>
          
                <a href="mailto:merobus3@gmail.com" className=" text-[#51519e] ">merobus3@gmail.com</a>
              </li>
             
            </nav>
          </div>



          <div class="  ">
            <h2 class=" text-lg font-semibold mb-1 text-[#009DF8]">  Get in touch</h2>
            {/* <p class="">Post-ironic portland shabby chic echo park, banjo fashion axe</p> */}

            {/* onSubmit={handleAddSubmit} */}
            <form className=' grid gap-3 mt-2'>

              <div className='flex gap-5'>
                <TextField sx={{
                  width: '18ch',
                  borderRadius: '8px', // Adjust the radius as needed
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px', // Ensure the input itself also has rounded corners
                  },
                }} type="text" size='small' label=" Name" value={name} onChange={(e) => setName(e.target.value)} required className="  border border-[#e6e3e3]   rounded-2xl  " />
                <TextField sx={{
                  width: '18ch',
                  borderRadius: '8px', // Adjust the radius as needed
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px', // Ensure the input itself also has rounded corners
                  },
                }} type="email" size='small' label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className=" border border-[#e6e3e3]   rounded-md " />

              </div>

              <TextField
                sx={{
                  width: '38ch',
                  borderRadius: '8px', // Adjust the radius as needed
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px', // Ensure the input itself also has rounded corners
                  },
                }}
                type="text"
                size='small'
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                multiline
                rows={4}  // Adjust the number of rows as needed
                className="border border-[#e6e3e3] rounded-md"
              />

              <div className='flex justify-center'>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  " sx={{width:"35ch"}} >SUBMIT</Button>
                {/* {isLoading && <Loader />} */}
              </div>

            </form>

          </div>



        </div>
      </div>
      <div class="bg-[#5b5c5d] text-[white]">
        <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row  gap-2">

          <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a class="ml-3 text-gray-500">
              <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
          <p class="text-gray-500 text-sm text-center sm:text-left">© 2024 Bus Booking System —
            <a href="https://twitter.com" rel="noopener noreferrer" class="cursor-pointer ml-1 hover:text-[#009DF8]" target="_blank">@merobus</a>
          </p>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
