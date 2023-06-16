import {React,useState} from "react";



export default function HelpPage(){

    const [contactFormData, setContactFormData] = useState({
        name:"",
        email:"",
        phone:"",
        subject:"",
        message:"",
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;
        setContactFormData((prevFormData) => {
          return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value,
          };
        });
        console.log(contactFormData);
      }

    return(
        <div className="flex flex-col h-screen w-full font-Nunito">
            <div className="bg-hero h-1/2  bg-cover select-none flex w-full items-center pl-5 lg:pl-44 text-white text-4xl">
            Contact us
            </div>
            <div className="flex justify-center m-10">
                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae condimentum dolor, et feugiat ligula.
                     Phasellus dapibus ultrices diam quis congue. Phasellus scelerisque et lectus ut volutpat.
                      Phasellus vestibulum tortor sed ipsum tempus posuere. Pellentesque luctus porttitor nulla,
                       a egestas mauris efficitur eleifend. Nam eget magna augue. Aenean ut turpis rhoncus, sagittis lectus eu,
                        vehicula ipsum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas lobortis metus et euismod aliquam.
                         Curabitur a pellentesque elit. Quisque magna ligula, cursus quis tempus vitae, eleifend a augue.
                          Ut tincidunt libero id purus sollicitudin ultrices.
                          Quisque vestibulum nisi id purus venenatis suscipit. Maecenas ultrices, orci et pharetra porttitor,
                           massa elit aliquam turpis, auctor tincidunt arcu tortor id augue. Vestibulum venenatis lacus nec dui pharetra,
                            et euismod nisl ornare. Vivamus elementum tempus semper. Phasellus at tellus ac eros pulvinar maximus.
                             Nunc laoreet rhoncus orci in egestas. Nam congue, magna eget condimentum dignissim, justo nulla tristique velit,
                              eu dapibus ipsum felis at mauris. Aenean commodo felis a dui luctus, in tincidunt diam auctor. Nam mollis felis in porta convallis.
                               Integer vitae mauris maximus, fringilla purus vel, consequat urna. </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-between">                
                <div className="m-5 lg:ml-72 lg:mt-6 border border-slate-300 rounded-lg lg:h-auto lg:w-3/4 pl-4 pr-4">
                    <h1 className="text-2xl">Send us an email</h1>
                    <p className="break-all">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         In gravida quis libero eleifend ornare. Maecenas mattis enim at arcu.
                    </p>
                    <form className="pt-4">
                        <div className="flex flex-col w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                <input 
                                    className="h-10 border border-gray-300 rounded-md p-1"
                                    placeholder="Name"
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={contactFormData.name}
                                />
                                <input 
                                    className="h-10 border border-gray-300 rounded-md p-1"
                                    placeholder="Email"
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    value={contactFormData.email}
                                />
                                <input 
                                    className="h-10 border border-gray-300 rounded-md p-1"
                                    placeholder="Phone"
                                    type="text"
                                    name="phone"
                                    onChange={handleChange}
                                    value={contactFormData.phone}
                                />
                                <input 
                                    className="h-10 border border-gray-300 rounded-md p-1"
                                    placeholder="Subject"
                                    type="text"
                                    name="subject"
                                    onChange={handleChange}
                                    value={contactFormData.subject}
                                />

                            </div>
                            <div className="pt-2 pb-2">
                                <textarea
                                className="border border-gray-300 rounded-md p-1 w-full"
                                placeholder="Your message"
                                name="message"
                                onChange={handleChange}
                                value={contactFormData.message}
                                />
                            </div>
                            <button className="bg-sky-500 rounded-md border-2 border-sky-500 text-white text-2xl mb-2 hover:bg-white hover:border-2 hover:border-sky-500 hover:text-sky-500 focus:outline-none transition-all hover:transition-all">Send</button>
                        </div>
                    </form>
                </div>
                <div className="m-5 lg:mr-72 lg:mt-6 border border-slate-300 lg:ml-10 rounded-lg lg:h-auto lg:w-2/5 pl-4 pr-4">
                    <h1 className="text-2xl">Contact us</h1>
                    <p className="break-all">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <h3 className="text-2xl">Adress</h3>
                    <p>Telegrafvej 9, 2750 Ballerup</p>
                    <h3 className="text-2xl">Phone</h3>
                    <p>+45 38177000</p>
                    <h3 className="text-2xl">Mail</h3>
                    <p>tec@tec.dk</p>
                </div>
            </div>
        </div>
    )
}
