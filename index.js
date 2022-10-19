document.addEventListener("DOMContentLoaded", (evt) => {
  const calculateBtn = document.querySelector("button[id='calculate']");
  const coef_a_input = document.querySelector("input[name='coef_a']");
  const coef_b_input = document.querySelector("input[name='coef_b']");
  const coef_c_input = document.querySelector("input[name='coef_c']");
  const errorWrapper = document.querySelector("div[id='error-wrapper']");
  const solutionWrapper = document.querySelector("div[id='solution-wrapper']");

  calculateBtn.addEventListener("click", (evt) => {
    solutionWrapper.style.display = "none";
    const validate = validateCoefs(
      coef_a_input.value,
      coef_b_input.value,
      coef_c_input.value
    );

    errorWrapper.style.display = validate ? "none" : "block";

    if (validate) {
      const delta = discriminant(
        coef_a_input.value,
        coef_b_input.value,
        coef_c_input.value
      );

      solutionWrapper.innerHTML = getSolutions(delta);
      solutionWrapper.style.display = "block";
    }
  });

  const getSolutions = (delta) => {
    let solution = "";
    if (delta > 0) {
      const x1 =
        (-coef_b_input.value - Math.sqrt(delta)) / (2 * coef_a_input.value);
      const x2 =
        (-coef_b_input.value + Math.sqrt(delta)) / (2 * coef_a_input.value);
      solution = `Δ > 0, alors l'équation admet deux solutions réelles `;
      solution += ` x<sub>1</sub> = ${x1} et x<sub>2</sub> = ${x2}`;
      return solution;
    }

    if (delta < 0) {
      solution = ` Δ < 0, alors l'équation n'admet pas de solution réelle `;
      return solution;
    }
    if (delta === 0) {
      x0 = -coef_b_input.value / (2 * coef_a_input.value);
      solution = `Δ = 0, alors l'équation admet une solution réelle double  `;
      solution += `x<sub>0</sub> = ${x0}`;
      return solution;
    }
  };
});

const validateCoefs = (...args) => {
  for (const coef of args) {
    if (isNaN(Number(coef))) {
      return false;
    }
  }
  return true;
};

const discriminant = (coef_a, coef_b, coef_c) => {
  const delta = Math.pow(coef_b, 2) - 4 * coef_a * coef_c;
  return delta;
};
