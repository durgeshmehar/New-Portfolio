import Particles from './effects/Particles_Design';

const ParticleBackground = ({ children, className = '' }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0">
        <Particles />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParticleBackground;