$('.dino-slider').slick({
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: $(".dino-prev"),
  nextArrow: $(".dino-next"),
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        dots: true,
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        dots: true,
        slidesToShow: 1
      }
    }
  ]
});
	


document.addEventListener('DOMContentLoaded', function() {
  // Получаем элементы
  const popup = document.getElementById('imagePopup');
  const popupImage = document.getElementById('popupImage');
  const closeBtn = document.querySelector('.close-btn');


  // Находим все изображения в карточках динозавров
  const dinoImages = document.querySelectorAll('.dino-card img');


  // Функция открытия поп‑апа
  function openPopup(imgSrc) {
    popupImage.src = imgSrc;
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Блокируем скролл
  }

  // Функция закрытия поп‑апа
  function closePopup() {
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Возвращаем скролл
  }

  // Обработчик клика на изображение
  dinoImages.forEach(img => {
    img.addEventListener('click', function() {
      const imgSrc = this.getAttribute('src');
      openPopup(imgSrc);
    });
  });

  // Обработчик закрытия по крестику
  closeBtn.addEventListener('click', closePopup);


  // Закрытие по клику вне изображения
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      closePopup();
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const roulette = document.querySelector('.roulette');
  const items = document.querySelectorAll('.item');
  const spinBtn = document.querySelector('.spin-btn');
  const resultText = document.querySelector('.result-text');

  const itemWidth = 170; // ширина элемента + отступы (150 + 2×10)
  const totalItems = items.length;
  let isSpinning = false;

  // Создаём дубликаты для бесшовной прокрутки
  function createDuplicates() {
    // Добавляем копии первых 3 элементов в конец
    for (let i = 0; i < 3; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add('duplicate');
      roulette.appendChild(clone);
    }
    // Добавляем копии последних 3 элементов в начало
    for (let i = totalItems - 3; i < totalItems; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add('duplicate');
      roulette.insertBefore(clone, items[0]);
    }
  }

  createDuplicates();

  // Функция запуска рулетки
  function spin() {
    if (isSpinning) return;
    isSpinning = true;

    // Случайное число «оборотов» (имитация торможения)
    const spins = Math.floor(Math.random() * 5) + 3; // 3–7 полных оборотов
    const randomOffset = Math.floor(Math.random() * totalItems); // случайный финальный элемент
    const finalPosition = -((totalItems * spins) + randomOffset) * itemWidth;


    // Анимируем перемещение
    roulette.style.transition = 'transform 4s ease-out';
    roulette.style.transform = `translateX(${finalPosition}px)`;

    // После анимации — определяем элемент под стрелкой
    setTimeout(() => {
      // Получаем центр контейнера
      const containerRect = roulette.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;

      // Находим ближайший элемент к центру
      let closestItem = null;
      let minDistance = Infinity;

      document.querySelectorAll('.item').forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(itemCenter - centerX);

        if (distance < minDistance) {
          minDistance = distance;
          closestItem = item;
        }
      });

      // Показываем текст из data-text
      if (closestItem) {
        resultText.textContent = closestItem.getAttribute('data-text');
      }

      // «Перематываем» карусель для следующего запуска (без анимации)
      setTimeout(() => {
        roulette.style.transition = 'none';
        roulette.style.transform = 'translateX(0)';
        // Перемещаем дубликаты обратно (чтобы не накапливались)
        document.querySelectorAll('.duplicate').forEach(dup => dup.remove());
        createDuplicates();
      }, 500);

      isSpinning = false;
    }, 4000); // 4 секунды анимации
  }

  spinBtn.addEventListener('click', spin);
});