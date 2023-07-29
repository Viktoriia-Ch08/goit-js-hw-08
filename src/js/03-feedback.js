import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const KEY = 'feedback-form-state';
let formInfo = {};

formEl.addEventListener('input', throttle(setStorageItem, 500));
formEl.addEventListener('submit', clearInfo);

function setStorageItem(event) {
  formInfo[event.target.name] = event.target.value.trim();

  const formInfoJSON = JSON.stringify(formInfo);
  localStorage.setItem(KEY, formInfoJSON);
}

const onLoad = () => {
  try {
    const data = localStorage.getItem(KEY);
    if (!data) return;
    formInfo = JSON.parse(data);
    Object.entries(formInfo).forEach(([key, value]) => {
      formEl.elements[key].value = value;
    });
  } catch (error) {
    console.log(error.message);
  }
};
window.addEventListener('load', onLoad);

function clearInfo(event) {
  event.preventDefault();
  console.log(formInfo);
  formInfo = {};
  localStorage.removeItem(KEY);
  formEl.reset();
}
