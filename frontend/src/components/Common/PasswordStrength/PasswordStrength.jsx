import zxcvbn from "zxcvbn";
import "./PasswordStrength.css";

const PasswordStrength = ({ password }) => {
  const result = zxcvbn(password);
  console.log(result.score, "score");

  const createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return "Weak";
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Weak";
    }
  };

  return (
    <div>
      <>
        <progress
          className={`password-strength-meter-progress strength-${createPasswordLabel(
            result
          )}`}
          value={result.score}
          max="4"
        />
        <p className="flex justify-center">{`Password Strength: ${createPasswordLabel(
          result
        )}`}</p>
      </>
    </div>
  );
};

export default PasswordStrength;
