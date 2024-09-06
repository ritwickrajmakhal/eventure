import React from 'react'
import './style.css';

const page = () => {
  return (
    <div className='text-white'>
        
<header className="header">

    {/* Font */}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"></link>
</header>



  {/* service section  */}
    <section className="service" id="service">
        <h1 className="heading"> Our <span>Services</span></h1>

            <div className='box-container'>
                <div className='box'>
                    <i className='fas fa-map-marker-alt'></i>
                    <h3>venue selection</h3>
                    <p>Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.
                    </p>
                </div>

                <div className='box'>
                    <i className='fas fa-envelope'></i>
                    <h3>invitation card</h3>
                    <p>Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.
                    </p>
                </div>

                <div className='box'>
                    <i className='fas fa-music'></i>
                    <h3>entertainment</h3>
                    <p>Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.
                    </p>
                </div>

                <div className='box'>
                    <i className='fas fa-utensils'></i>
                    <h3>food and drinks</h3>
                    <p>Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.
                    </p>
                </div>

                <div className='box'>
                    <i className='fas fa-photo-video'></i>
                    <h3>photos and videos</h3>
                    <p>Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.
                    </p>
                </div>

                <div className='box'>
                    <i className='fas fa-birthday-cake'></i>
                    <h3>custom food</h3>
                    <p>Users access websites using web browsers and can navigate through the pages by clicking on links or using menus. A web service is a technological component of the internet that facilitates communication and data exchange between different software applications.
                    </p>
                </div>
            </div>

    </section>    
    </div>
    )
}

export default page
