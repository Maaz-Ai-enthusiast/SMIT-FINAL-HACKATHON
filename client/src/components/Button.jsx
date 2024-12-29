/* eslint-disable react/prop-types */

function Button({ className, title }) {
    return (
      <button className={`px-6 py-3 rounded-lg text-xl font-semibold ${className}`}>
        {title}
      </button>
    );
  }
  
  export default Button;
  