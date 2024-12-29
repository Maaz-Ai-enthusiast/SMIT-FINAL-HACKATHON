
import Button from "./Button";

const CallToAction = () => {
  return (
    <section className="bg-deep-blue text-white text-center py-20">
      <h2 className="text-3xl font-bold mb-4">Ready to Manage Your Events?</h2>
      <p className="text-xl mb-6">
        Start creating, managing, and joining events now with Connectify.
      </p>
      <Button
        className="bg-soft-yellow text-black transition-all duration-300"
        title="Join Now"
      />
    </section>
  );
};

export default CallToAction;
