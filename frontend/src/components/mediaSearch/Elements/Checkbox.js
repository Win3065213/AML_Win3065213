export default function Checkbox({ id, checked, onChange, label }) {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="form-checkbox"
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  }