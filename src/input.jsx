import React from "react";
import { useField } from "formik";
function Input({
   name, label, id, placeholder}){
    const field = useField(name);
    console.log(field)
    const [data , meta ]= field;
    const{onChange , onBlur, value}=data;
    const{error, touched}=meta;
    let borderClass="  border-white";
    if(error && touched){
        borderClass="border-red-500"
    }

    return(

        <div className="mb-4">
            <label htmlFor={id} className="sr-only">
                {label}
            </label>
        <input
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          placeholder={placeholder}
          className={"w-full p-3 border  rounded-lg text-gray-600 placeholder-gray-600 bg-green-100" +" " + borderClass}

        />
        { touched && error && <div className='text-red-500'>{error}</div> }
      </div>
    );
}

export default Input;