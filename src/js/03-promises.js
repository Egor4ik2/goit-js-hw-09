


// import Notiflix from "notiflix";

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;

//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// function showSuccessNotification(position, delay) {
//   setTimeout(() => {
//     Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
//   }, delay);
// }

// function showFailureNotification(position, delay) {
//   setTimeout(() => {
//     Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
//   }, delay);
// }

// function handleSubmit(event) {
//   event.preventDefault();

//   const form = event.target;
//   const firstDelay = parseInt(form.elements.delay.value);
//   const step = parseInt(form.elements.step.value);
//   const amount = parseInt(form.elements.amount.value);

//   let promises = [];

//   for (let i = 1; i <= amount; i++) {
//     const delay = firstDelay + (i - 1) * step;
//     const promise = createPromise(i, delay);

//     promises.push(promise);
//   }

//   Promise.allSettled(promises)
//     .then(results => {
//       results.forEach(result => {
//         if (result.status === "fulfilled") {
//           const { position, delay } = result.value;
//           showSuccessNotification(position, delay);
//         } else if (result.status === "rejected") {
//           const { position, delay } = result.reason;
//           showFailureNotification(position, delay);
//         }
//       });
//     });
// }

// const form = document.querySelector(".form");
// form.addEventListener("submit", handleSubmit);


// import Notiflix from "notiflix";

// function createPromise(position) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;

//     if (shouldResolve) {
//       resolve({ position });
//     } else {
//       reject({ position });
//     }
//   });
// }

// function showSuccessNotification(position) {
//   setTimeout(() => {
//     Notiflix.Notify.success(`Fulfilled promise ${position}`);
//   }, 1000);
// }

// function showFailureNotification(position) {
//   setTimeout(() => {
//     Notiflix.Notify.failure(`Rejected promise ${position}`);
//   }, 1000);
// }

// function handleSubmit(event) {
//   event.preventDefault();

//   const form = event.target;
//   const amount = parseInt(form.elements.amount.value);

//   let promises = [];

//   for (let i = 1; i <= amount; i++) {
//     const promise = createPromise(i);
//     promises.push(promise);
//   }

//   promises.forEach((promise, index) => {
//     promise
//       .then(() => {
//         showSuccessNotification(index + 1);
//       })
//       .catch(() => {
//         showFailureNotification(index + 1);
//       });
//   });
// }

// const form = document.querySelector(".form");
// form.addEventListener("submit", handleSubmit);



import Notiflix from "notiflix";

function createPromise(position) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      resolve({ position });
    } else {
      reject({ position });
    }
  });
}

function showSuccessNotification(position) {
  return new Promise(resolve => {
    setTimeout(() => {
      Notiflix.Notify.success(`Fulfilled promise ${position}`);
      resolve();
    }, 1000);
  });
}

function showFailureNotification(position) {
  return new Promise(resolve => {
    setTimeout(() => {
      Notiflix.Notify.failure(`Rejected promise ${position}`);
      resolve();
    }, 1000);
  });
}

async function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const amount = parseInt(form.elements.amount.value);

  for (let i = 1; i <= amount; i++) {
    const promise = createPromise(i);

    try {
      await promise;
      await showSuccessNotification(i);
    } catch {
      await showFailureNotification(i);
    }
  }
}

const form = document.querySelector(".form");
form.addEventListener("submit", handleSubmit);
