import React from 'react'
import { useState, useRef,useEffect } from 'react'
import { useForm } from "react-hook-form";
import { User, Newspaper, Link, LocateFixed, UserPen, Paperclip ,X,Save} from 'lucide-react'
import { NavLink ,useNavigate} from "react-router-dom";
import codeArena from '../assets/codeArena.png'
import { useDispatch,useSelector } from "react-redux";
import { fetchProfile } from '../Redux/profileSlice';
import axios from "axios";





const Editprofile = () => {


  const myProfile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { register, handleSubmit, watch,reset, formState: { errors, isDirty,dirtyFields} } = useForm();
  const Data = watch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
       setSelectedFile(file);
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("Changed fields:", dirtyFields);

      const formData = new FormData();

      // Append only changed, non-empty fields
      Object.keys(dirtyFields).forEach((field) => {
        const value = data[field];

        if (typeof value === "string" && value.trim() !== "") {
          formData.append(field, value.trim());
        }
      });

      // Append the image only if the user selected a new one
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      // Stop if there is nothing to update
      if ([...formData.keys()].length === 0) {
        console.log("No changes to save.");
        return;
      }

      const response = await axios.patch(
        "http://localhost:8000/api/profile/edit",
        formData,
        { withCredentials: true }
      );

      console.log("API response:", response.data);

      // Refresh profile data in Redux
      dispatch(fetchProfile());

      navigate("/profile");
    } catch (error) {
      console.error(
        "Profile update failed:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (myProfile) {
      reset({
        displayName: myProfile.displayName || "",
        userName: myProfile.userName || "",
        country: myProfile.country || "",
        location: myProfile.location || "",
        bio: myProfile.bio || "",
        college: myProfile.college || "",
        github: myProfile.github || "",
        linkedin: myProfile.linkedin || "",
        website: myProfile.website || "",
      });

    }
  }, [myProfile, reset]);  




  return (
    <div className='bg-page absolute top-0 h-screen w-screen pt-24 pl-7 overflow-scroll pb-22 max-lg:relative max-lg:top-auto max-lg:h-auto max-lg:min-h-screen max-lg:w-full max-lg:overflow-x-hidden max-lg:pl-0 max-lg:pb-28'>
      <div className="main  w-[90%]  mx-auto max-lg:w-full max-lg:px-4">

        <div className="top w-full flex flex-col gap-2">
          <div className="profile flex gap-2">
            <NavLink className='hover:cursor-pointer text-text/40 flex items-center' to="/profile"><User />My profile {">"}</NavLink>
            <h1 className='text-text'>Edit profile</h1>
          </div>
          <h1 className='text-violet-500 font-patrick text-md  mt-3'>MAKE YOURSELF AT HOME</h1>
          <h1 className='text-5xl  font-bold text-text font-Saira max-sm:text-4xl'>Edit your profile</h1>
          <p className='text-text/40'>A little about you.A place for everything you're building.</p>
        </div>

        <div className="bottom w-full flex gap-4 mt-3 h-[670px] max-lg:h-auto max-lg:flex-col">
          <div className="left flex flex-col gap-4 w-[20%] max-lg:w-full">
            <div className="top w-full">
              <a href='#profileDetails'>
                <div className="profile flex h-12 text-text/40 hover:text-violet-500 justify-between items-center p-3 hover:cursor-pointer hover:bg-violet-500/10 rounded-lg  hover:border-violet-600 hover:border">
                  <h1 className=' flex gap-2 items-center justify-center '><User className='h-4' />Profile details</h1>
                  <h1 className=' '>{">"}</h1>
                </div>
              </a>
              <a href='#aboutYou'>
                <div className="profile flex h-12 text-text/40 hover:text-violet-500 justify-between items-center p-3 hover:cursor-pointer hover:bg-violet-500/10 rounded-lg  hover:border-violet-600 hover:border">
                  <h1 className=' flex gap-2 items-center justify-center '><Newspaper className='h-4' />About you</h1>
                  <h1 className=' '>{">"}</h1>
                </div>
              </a>
              <a href='#social'>
                <div className="profile flex h-12 text-text/40 hover:text-violet-500 justify-between items-center p-3 hover:cursor-pointer hover:bg-violet-500/10 rounded-lg  hover:border-violet-600 hover:border">
                  <h1 className=' flex gap-2 items-center justify-center '><Link className='h-4' />Social & links</h1>
                  <h1 className=' '>{">"}</h1>
                </div>
              </a>

            </div>
            <div className="preview w-full rounded-lg flex flex-col gap-3 border overflow-y-auto border-border bg-section h-125 p-3 max-sm:h-auto max-sm:max-h-56">
              <h1 className='font-Saira text-text/30'>LIVE PREVIEW</h1>
              <div className="main w-full flex flex-col items-center mt-2 ">
                <img
                  src={myProfile?.avatar || codeArena}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
                <h1 className='text-text font-bold mt-3'>{Data.displayName || "Your Name"}</h1>
                <h1 className='text-text/30 mt-1'>{Data.userName || "@your_username"}</h1>
                <button className='bg-purple-500/10 mt-2 border border-violet-500 rounded-lg text-violet-300 px-3 py-1'>codeArena Member</button>
                <p className='mt-4 text-text/30 text-wrap'>{Data.bio || "Your bio"}</p>
                <h1 className='flex gap-1 text-text/30 mt-3 items-center'><LocateFixed size={16} strokeWidth={1} />{Data.location || "Your location"}</h1>
                <h1 className='mt-3 text-text/30'>{Data.country || "Your country"}</h1>
                <div className="bottom mt-4 border-t border-t-border p-3 flex flex-col items-center gap-3">
                  <h1><User className='text-text/30' size={16} strokeWidth={1} /></h1>
                  <p className='text-text/30 text'>How others coders will see you</p>
                </div>
              </div>
            </div>
          </div>
          <form
            className='right h-full overflow-scroll relative w-[80%] gap-5 max-lg:h-auto max-lg:w-full max-lg:overflow-visible'
            onSubmit={handleSubmit(onSubmit,
              (errors) => console.log("Form validation errors:", errors)
            )}>

            <div
              id="profileDetails"
              className="profile w-full flex flex-col py-5 px-6 bg-section h-[450px] rounded-lg border border-border max-lg:h-auto max-sm:px-4">
              <h1 className='font-bold font-patrick text-text'>Profile details</h1>
              <h3 className='text-text/40 mt-2 text-sm'>The face and name behind your code.</h3>

              <div className="pic w-full h-32 flex gap-3 rounded-lg border border-border bg-page mt-4 p-4 max-sm:h-auto max-sm:flex-wrap max-sm:p-3">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <img
                    src={myProfile?.avatar|| codeArena}
                    alt="Profile"
                    onClick={() => fileInputRef.current.click()}
                    className="w-24 h-24 rounded-full object-cover cursor-pointer hover:opacity-80"
                  />
                </div>
                <div className="input flex flex-col gap-1">
                  <h1 className='text-text font-bold'>Your arena identity</h1>
                  <p className='text-text/30'>initials update with your display name.</p>
                  <h1 className='text-text/60'>{"<-  "}Upload your profile pic</h1>
                </div>
              </div>

              <div className="name w-full flex gap-2 max-sm:flex-col">

                <div className="group mt-5 w-[50%] max-sm:w-full">
                  <label className='text-text/50 '>Display name</label>
                  <div className="flex items-center gap-3 border border-border rounded-md px-3 focus-within:border-violet-500   transition-all duration-300 w-full h-10 bg-page mt-3">

                    <UserPen className="text-text/40" size={20} />
                    <input
                      {...register("displayName", {
                        
                        minLength: {
                          value: 3,
                          message: "Display name must contain at least 3 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "Display name cannot exceed 20 characters",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9_ ]+$/,
                          message: "Only letters, numbers, spaces, and underscores are allowed",
                        },
                      })}
                      type="text" placeholder="Virat Kohli"
                      className="w-full bg-transparent outline-none text-text" />
                  </div>
                </div>
                {errors?.displayName && (
                  <p className="text-red-500 text-sm">
                    {errors?.displayName?.message}
                  </p>
                )}

                <div className="group mt-5 w-[50%] max-sm:w-full">
                  <label className='text-text/50 '>Username</label>
                  <div className="flex items-center gap-3 border border-border rounded-md px-3 focus-within:border-violet-500   transition-all duration-300 w-full h-10 bg-page mt-3">

                    <Paperclip className="text-text/40" size={20} />
                    <input
                      {...register("userName", {
                        
                        minLength: {
                          value: 3,
                          message: "Display name must contain at least 3 characters",
                        },
                        maxLength: {
                          value: 20,
                          message: "Display name cannot exceed 20 characters",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9_ ]+$/,
                          message: "Only letters, numbers, spaces, and underscores are allowed",
                        },
                      })}
                      type="text" placeholder="@kohli_virat"
                      className="w-full bg-transparent outline-none text-text" />
                  </div>
                </div>
                {errors?.displayName && (
                  <p className="text-red-500 text-sm">
                    {errors?.displayName?.message}
                  </p>
                )}

              </div>


              <div className="name w-full flex gap-2 max-sm:flex-col">

                <div className="group mt-5 w-[50%] max-sm:w-full">
                  <label className="text-text/50">Country / Region</label>

                  <div className="flex items-center gap-3 border border-border rounded-md px-3 focus-within:border-violet-500 transition-all duration-300 w-full h-10 bg-page mt-3">

                    <select
                      {...register("country", {
                       
                      })}
                      defaultValue=""
                      className="w-full bg-transparent outline-none text-text"
                    >
                      <option value="" disabled className="bg-page">
                        Select your country
                      </option>

                      <option value="India" className="bg-page">India</option>
                      <option value="United States" className="bg-page">United States</option>
                      <option value="United Kingdom" className="bg-page">United Kingdom</option>
                      <option value="Canada" className="bg-page">Canada</option>
                      <option value="Australia" className="bg-page">Australia</option>
                      <option value="Germany" className="bg-page">Germany</option>
                      <option value="France" className="bg-page">France</option>
                      <option value="Japan" className="bg-page">Japan</option>
                      <option value="China" className="bg-page">China</option>
                      <option value="Brazil" className="bg-page">Brazil</option>

                      <option value="Other" className="bg-page">Other</option>
                    </select>

                  </div>

                  {errors?.country && (
                    <p className="text-red-500 text-sm">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div className="group mt-5 w-[50%] max-sm:w-full">
                  <label className="text-text/50">Location</label>

                  <div className="flex items-center gap-3 border border-border rounded-md px-3 focus-within:border-violet-500 transition-all duration-300 w-full h-10 bg-page mt-3">

                    <LocateFixed className="text-text/40" size={20} />

                    <input
                      {...register("location", {
                        maxLength: {
                          value: 50,
                          message: "Location cannot exceed 50 characters",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9,.\- ]+$/,
                          message: "Please enter a valid location",
                        },
                      })}
                      type="text"
                      placeholder="e.g. Indore, Madhya Pradesh"
                      className="w-full bg-transparent outline-none text-text"
                    />
                  </div>

                  {errors?.location && (
                    <p className="text-red-500 text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>

              </div>

            </div>

            <div
              id='aboutYou'
              className="about w-full flex flex-col py-5 px-6 mt-6 bg-section h-[400px] rounded-lg border border-border max-lg:h-auto max-sm:px-4">
              <h1 className='text-text font-bold font-mono'>About you</h1>
              <p className='text-text/40 text-sm mt-2'>Tell the community what makes you,you.</p>
              <div className="group mt-5 w-full">
                <label className="text-text/50">Bio</label>

                <div className="flex items-start gap-3 border border-border rounded-md px-3 py-3 focus-within:border-violet-500 transition-all duration-300 w-full bg-page mt-3">

                  <Newspaper className="text-text/40 mt-1" size={20} />

                  <textarea
                    {...register("bio", {
                      maxLength: {
                        value: 200,
                        message: "Bio cannot exceed 200 characters",
                      },
                    })}
                    rows={4}
                    placeholder="Tell us a little about yourself..."
                    className="w-full bg-transparent outline-none text-text resize-none"
                  />
                </div>

                {errors?.bio && (
                  <p className="text-red-500 text-sm">
                    {errors.bio.message}
                  </p>
                )}

                <p className="text-text/30 text-xs mt-1">
                  Maximum 200 characters.
                </p>
              </div>
              <div className="group mt-5 w-full">
                <label className="text-text/50">Company / School</label>

                <div className="flex items-center gap-3 border border-border rounded-md px-3 focus-within:border-violet-500 transition-all duration-300 w-full h-10 bg-page mt-3">

                  <Newspaper className="text-text/40" size={20} />

                  <input
                    {...register("college", {
                      maxLength: {
                        value: 100,
                        message: "Company / School cannot exceed 100 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9&.,()\- ]+$/,
                        message: "Please enter a valid company or school name",
                      },
                    })}
                    type="text"
                    placeholder="e.g. Google, RGPV University"
                    className="w-full bg-transparent outline-none text-text"
                  />
                </div>

                {errors?.company && (
                  <p className="text-red-500 text-sm">
                    {errors.company.message}
                  </p>
                )}
              </div>
            </div>

            <div
              id='social'
              className="about w-full flex flex-col py-5 px-6 mt-6 overflow-scroll bg-section h-[430px] rounded-lg border border-border max-lg:h-auto max-lg:overflow-visible max-sm:px-4">
              <h1 className='text-text font-bold font-mono'>Social & links</h1>
              <p className='text-text/40 text-sm mt-2'>Let your work do some talking.</p>

              <div className="group mt-5 w-full">
                <label className="text-text/50">GitHub</label>

                <div className="flex items-center gap-3 border border-border rounded-md px-4 focus-within:border-violet-500 transition-all duration-300 w-full h-14 bg-page mt-3">

                  <span className="text-text/40 whitespace-nowrap">
                    github.com/
                  </span>

                  <input
                    {...register("github", {
                      maxLength: {
                        value: 39,
                        message: "GitHub username cannot exceed 39 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/,
                        message: "Please enter a valid GitHub username",
                      },
                    })}
                    type="text"
                    placeholder="your-username"
                    className="w-full bg-transparent outline-none text-text"
                  />

                </div>

                {errors?.github && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.github.message}
                  </p>
                )}
              </div>

              <div className="group mt-5 w-full">
                <label className="text-text/50">LinkedIn</label>

                <div className="flex items-center gap-3 border border-border rounded-md px-4 focus-within:border-violet-500 transition-all duration-300 w-full h-14 bg-page mt-3">

                  <span className="text-text/40 whitespace-nowrap">
                    linkedin.com/in/
                  </span>

                  <input
                    {...register("linkedin", {
                      maxLength: {
                        value: 100,
                        message: "LinkedIn profile cannot exceed 100 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9-]+$/,
                        message: "Enter a valid LinkedIn profile username",
                      },
                    })}
                    type="text"
                    placeholder="your-profile"
                    className="w-full bg-transparent outline-none text-text"
                  />

                </div>

                {errors?.linkedin && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.linkedin.message}
                  </p>
                )}
              </div>

              <div className="group mt-5 w-full">
                <label className="text-text/50">Personal website</label>

                <div className="flex items-center gap-3 border border-border rounded-md px-4 focus-within:border-violet-500 transition-all duration-300 w-full h-14 bg-page mt-3">

                  <input
                    {...register("website", {
                      maxLength: {
                        value: 2048,
                        message: "Website URL is too long",
                      },
                      pattern: {
                        value: /^https?:\/\/.+\..+/i,
                        message: "Enter a valid website URL starting with http:// or https://",
                      },
                    })}
                    type="url"
                    placeholder="https://your-website.com"
                    className="w-full bg-transparent outline-none text-text"
                  />

                </div>

                {errors?.website && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.website.message}
                  </p>
                )}
              </div>


            </div>

            <div className="z-20 flex h-15 fixed bottom-0 items-center justify-between rounded-lg border border-gray-800 bg-section px-5 w-[1070px] mb-3 max-lg:left-3 max-lg:right-3 max-lg:w-auto max-lg:px-3 max-sm:h-auto max-sm:gap-2 max-sm:py-2 max-sm:items-stretch max-sm:flex-col">
              <p className='text-text/50 max-sm:hidden'>Your profile is up to date</p>

              <div className="flex gap-3 max-sm:justify-end">
                <button 
                onClick={()=>reset()}
                className='bg-red-500 text-text px-3 py-1 hover:cursor-pointer font-Alumni rounded-lg border border-border flex gap-2 items-center font-bold hover:bg-white hover:text-red-500' type="button"><X size={16} strokeWidth={1} />Cancel</button>
                <button
                  className={`px-3 py-1 font-Alumni font-bold rounded-lg border flex gap-2 items-center border-border ${isDirty || selectedFile
                      ? "bg-indigo-600 text-white cursor-pointer hover:bg-white hover:text-violet-500"
                      : "bg-indigo-600/40 text-gray-400 cursor-not-allowed"
                    }`}
                  type="submit"
                  disabled={!isDirty && !selectedFile}
                >
                  <Save size={16} strokeWidth={1} />
                  Save changes
                </button>
              </div>
            </div>
          

          </form>


        </div>

      </div>
    </div>
  )
}

export default Editprofile
