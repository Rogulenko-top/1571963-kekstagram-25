import {imagePreviewElement} from './scale-image.js';

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const scaleInput = document.querySelector('.scale__control--value');
const effectImageNoneElement = document.querySelector('#effect-none');

const effect = {
  'effect-none': {
    filter: 'none',
    unit: '',
    class: '',
    noUiSlider: {
      range: {
        min: 0,
        max: 0
      },
      start: 0,
      step: 0,
    }
  },
  'effect-chrome': {
    filter: 'grayscale',
    unit: '',
    class: 'chrome',
    noUiSlider: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    }
  },
  'effect-sepia': {
    filter: 'sepia',
    unit: '',
    class: 'sepia',
    noUiSlider: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    }
  },
  'effect-marvin': {
    filter: 'invert',
    unit: '%',
    class: 'marvin',
    noUiSlider: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
    }
  },
  'effect-phobos': {
    filter: 'blur',
    unit: 'px',
    class: 'phobos',
    noUiSlider: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
    }
  },
  'effect-heat': {
    filter: 'brightness',
    unit: '',
    class: 'heat',
    noUiSlider: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
    }
  }
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => (
      parseFloat(value)
    ),
  }
});

effectLevelSlider.classList.add('hidden');

const onChangeEffectsList = (evt) => {
  imagePreviewElement.classList = '';
  if (evt.target.id === 'effect-none') {
    effectLevelSlider.classList.add('hidden');
    imagePreviewElement.style.filter = 'none';
  } else {
    effectLevelSlider.classList.remove('hidden');
    effectLevelSlider.noUiSlider.updateOptions(effect[evt.target.id].noUiSlider);
    imagePreviewElement.classList.add(`effects__preview--${effect[evt.target.id].class}`);
  }
};

effectLevelSlider.noUiSlider.on('update', () => {
  const selectedFilter = effectsList.querySelector('input:checked').id;
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  imagePreviewElement.style.filter = `${effect[selectedFilter].filter}(${sliderValue}${effect[selectedFilter].unit})`;
});

effectsList.addEventListener('change', onChangeEffectsList);

export {imagePreviewElement, scaleInput, effectLevelValue, effectImageNoneElement, effectLevelSlider};
