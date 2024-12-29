import { Link ,NavLink} from "react-router-dom";
import AppFeatures from "./AppFeatures";
import Button from "./Button";

const HeroSection = () => {
  return (
    <section className="bg-deep-blue text-white text-center py-20 px-4">
      <h1 className="text-2xl sm:text-4xl font-bold mb-4">
        Welcome to <span className="text-soft-yellow">Connectify</span>
      </h1>
      <p className="text-lg sm:text-xl mb-6 max-w-3xl mx-auto">
        Your all-in-one platform for creating, managing, and joining events. Whether you're looking to host a conference, attend a concert, or connect with like-minded individuals, Connectify has everything you need to stay up-to-date with exciting opportunities.
      </p>

      <div className="flex justify-center gap-6 mb-6 flex-wrap">
       
       
        <Link to="/signup">
        <Button
          className="bg-soft-yellow text-black transition-all duration-300 px-6 py-3 text-xl sm:text-lg"
          title="Get Started"
        />
        </Link>
        
      <NavLink to="/features" >
      <Button
          className="bg-transparent border-2 border-soft-yellow text-soft-yellow hover:bg-soft-yellow hover:text-black transition-all duration-300 px-6 py-3 text-xl sm:text-lg"
          title="Learn More"
        />
      </NavLink>
      </div>

      <p className="text-sm sm:text-base text-cool-gray">
        Explore features like event creation, real-time updates, RSVP functionality, and more. Join us and start making connections today!
      </p>
    </section>
  );
};

export default HeroSection;
