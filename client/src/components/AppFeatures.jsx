const AppFeatures = () => {
  return (
    <section className="py-20 bg-light-gray text-center px-6 sm:px-12 lg:px-20">
      <h2 className="text-3xl font-bold mb-10 text-[#283593]">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="border-2 border-gray-300 shadow-lg p-6 hover:shadow-xl hover:scale-105 transform transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-deep-blue flex items-center justify-center">
            <span className="mr-2">🌟</span>Effortless Sign-Up & Log-In
          </h3>
          <p className="text-cool-gray mb-4">
            Sign up and log in instantly using your preferred method—email, social accounts (Google/Facebook), or single sign-on (SSO).
          </p>
          <p className="text-cool-gray">
            Enjoy a fast and secure authentication process with easy access to your personal dashboard and events.
          </p>
        </div>

        <div className="border-2 border-gray-300 shadow-lg p-6 hover:shadow-xl hover:scale-105 transform transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-deep-blue flex items-center justify-center">
            <span className="mr-2">📅</span>Event Dashboard
          </h3>
          <p className="text-cool-gray mb-4">
            View upcoming and past events with easy filtering options based on date or category.
          </p>
          <p className="text-cool-gray">
            Stay updated on all events, filter them by categories like tech, music, and sports, and access event details with a click.
          </p>
        </div>

        <div className="border-2 border-gray-300 shadow-lg p-6 hover:shadow-xl hover:scale-105 transform transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-deep-blue flex items-center justify-center">
            <span className="mr-2">✍️</span>Create Events with Ease
          </h3>
          <p className="text-cool-gray mb-4">
            Create events with essential details: title, description, date, location, and category.
          </p>
          <p className="text-cool-gray">
            Customize event visibility (public or private) and manage event details effortlessly through an intuitive form.
          </p>
        </div>

        <div className="border-2 border-gray-300 shadow-lg p-6 hover:shadow-xl hover:scale-105 transform transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-deep-blue flex items-center justify-center">
            <span className="mr-2">✅</span>RSVP for Events
          </h3>
          <p className="text-cool-gray mb-4">
            Confirm your attendance by RSVP’ing to events and view a list of attendees.
          </p>
          <p className="text-cool-gray">
            Keep track of the number of people attending and automatically update the event database.
          </p>
        </div>

        <div className="border-2 border-gray-300 shadow-lg p-6 hover:shadow-xl hover:scale-105 transform transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-deep-blue flex items-center justify-center">
            <span className="mr-2">🔔</span>Real-Time Event Updates
          </h3>
          <p className="text-cool-gray mb-4">
            Get instant notifications about any updates or changes to events you are interested in.
          </p>
          <p className="text-cool-gray">
            Stay informed about event status, changes, and new RSVPs in real-time with seamless updates.
          </p>
        </div>

        <div className="border-2 border-gray-300 shadow-lg p-6 hover:shadow-xl hover:scale-105 transform transition-all duration-300">
          <h3 className="text-2xl font-semibold mb-4 text-deep-blue flex items-center justify-center">
            <span className="mr-2">🎁</span>Additional Features
          </h3>
          <p className="text-cool-gray mb-4">
            Enjoy extra functionalities such as email reminders and event check-in QR codes.
          </p>
          <p className="text-cool-gray">
            Get email reminders for upcoming events and generate QR codes for seamless check-ins during events.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
