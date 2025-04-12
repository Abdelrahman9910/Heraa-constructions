
document.addEventListener("DOMContentLoaded", function () {
  // Initialize counters
  const numberSpans = document.querySelectorAll(".circle span:first-child");
  numberSpans.forEach((span) => {
    const targetNumber = parseInt(span.textContent);
    startCounter(span, targetNumber);
  });

  // File upload functionality
  const fileInput = document.getElementById("file");
  const fileNameDisplay = document.querySelector(".file-name");
  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener("change", function () {
      fileNameDisplay.textContent =
        fileInput.files[0]?.name || "No file chosen";
    });
  }

  // Government section animation
  const govSection = document.querySelector(".goverments_child");
  if (govSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) => entry.isIntersecting && entry.target.classList.add("show")
        );
      },
      { threshold: 0.7 }
    );
    observer.observe(govSection);
  }

  // Initialize carousels
  initCarousels();
});

// Counter function
function startCounter(spanElement, targetNumber) {
  let currentNumber = 0;
  const increment = targetNumber / 100;
  const interval = setInterval(() => {
    currentNumber += increment;
    if (currentNumber >= targetNumber) {
      clearInterval(interval);
      currentNumber = targetNumber;
    }
    spanElement.textContent = Math.floor(currentNumber) + "+";
  }, 20);
}

// Carousel initialization
function initCarousels() {
  // Main carousel
  const slidesContainer = document.querySelector(".custom-carousel-slides");
  if (slidesContainer) {
    const slides = document.querySelectorAll(".custom-carousel-slide");
    const indicators = document.querySelectorAll(
      ".custom-carousel-indicators button"
    );
    const prevButton = document.querySelector(".custom-carousel-prev");
    const nextButton = document.querySelector(".custom-carousel-next");

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentSlide);
      });
    }

    let autoSlideInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
    }, 6000);

    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        currentSlide = index;
        updateCarousel();
        resetInterval();
      });
    });

    prevButton?.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateCarousel();
      resetInterval();
    });

    nextButton?.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateCarousel();
      resetInterval();
    });

    function resetInterval() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
      }, 6000);
    }

    updateCarousel();
  }

  // Press carousel
  const pressSlider = document.getElementById("press-slider");
  if (pressSlider) {
    const slides = document.querySelectorAll(".press-slide");
    const indicatorsContainer = document.getElementById("press-indicators");
    const prevButton = document.getElementById("press-prev");
    const nextButton = document.getElementById("press-next");

    let currentIndex = 0;

    function updateSlider() {
      pressSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
      document.querySelectorAll(".press-indicator").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    slides.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("press-indicator");
      if (index === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
      });
      indicatorsContainer.appendChild(indicator);
    });

    prevButton?.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateSlider();
    });

    nextButton?.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    });

    updateSlider();
  }
}

// Side navigation
function toggleSideNav(forceClose = false) {
  const sideNav = document.getElementById("sideNav");
  const overlay = document.getElementById("overlay");
  if (!sideNav || !overlay) return;

  if (forceClose || sideNav.style.width === "250px") {
    sideNav.style.width = "0";
    overlay.style.display = "none";
  } else {
    sideNav.style.width = "250px";
    overlay.style.display = "block";
  }
}

document.addEventListener("click", function (event) {
  const sideNav = document.getElementById("sideNav");
  const hamburger = document.querySelector(".hamburger");

  if (
    sideNav?.style.width === "250px" &&
    !sideNav.contains(event.target) &&
    !hamburger?.contains(event.target)
  ) {
    toggleSideNav(true);
  }
});

document.querySelectorAll("#sideNav a").forEach((link) => {
  link.addEventListener("click", () => toggleSideNav(true));
});

// Language dropdowns
function toggleLanguageDropdown() {
  const dropdown = document.getElementById("customLanguageDropdown");
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

function projectToggleLanguageDropdown() {
  const dropdownMenu = document.getElementById("project-languageDropdownMenu");
  dropdownMenu.classList.toggle("active");
}

window.onclick = function (event) {
  if (!event.target.matches(".language-button")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let dropdown of dropdowns) {
      dropdown.style.display = "none";
    }
  }

  if (!event.target.matches(".project-dropdown-toggle")) {
    const dropdowns = document.getElementsByClassName("project-dropdown-menu");
    for (let dropdown of dropdowns) {
      dropdown.classList.remove("active");
    }
  }
};

// Job popup functionality
const jobData = {
  // English Jobs
  1: {
    title: "Technical Office Engineer",
    level: "Mid-level",
    location: "Cairo",
    country: "Egypt",
    description:
      "Job Description:one of Egypt's leading construction companies, is seeking an experienced and highly skilled Technical Office Engineer to join our team. The engineer will be responsible for:",
    specifications: [
      "Prepare technical drawings and execution details using design software",
      "Follow up on and prepare technical and financial payment certificates for projects.",
      "Coordinate with engineering, execution, and administrative teams to ensure projects are implemented according to plans and specifications.",
      "Review drawings and technical documents to ensure compliance with standards and specifications.",
      "Prepare regular technical reports on project progress Provide technical support during project execution phases.",
    ],
    qualifications: [
      "Bachelor’s degree in Architectural Engineering or Civil Engineering",
      "Minimum of 5 years of experience in the technical office field within construction companies.",
      "Proficiency in design software such as AutoCAD and Revit",
      "Experience in preparing and following up on technical and financial payment certificates",
      "Ability to work under pressure and in a fast-paced environment.",
      "Excellent communication and coordination skills with various teams.",
    ],
  },
  2: {
    title: "Cost Accountant",
    level: "Senior",
    location: "Cairo",
    country: "Egypt",
    description:
      "A contracting company is seeking a highly experienced and qualified cost accountant to join its team. The accountant will be responsible for managing and tracking project costs, preparing periodic financial reports, and ensuring financial efficiency throughout all project phases.",
    specifications: [
      "Prepare, analyze, and monitor project costs throughout the implementation phases.",
      "Prepare periodic reports on actual costs versus planned budgets.",
      "Monitor and document costs related to materials, labor, and equipment.",
      "Coordinate with purchasing and warehouse teams to ensure the accuracy of cost data.",
      "Analyze variances between actual and planned costs and provide recommendations for improving efficiency.",
      "Prepare payment extracts and financial documents related to projects.",
      "Ensure compliance with the company's financial policies and procedures.",
    ],
    qualifications: [
      "Bachelor's degree in accounting, finance, or a related field.",
      "At least 5 years of experience in cost accounting, preferably in the contracting sector.",
      "Good knowledge of accounting and financial analysis software.",
      "Strong analytical skills and the ability to accurately handle numbers.",
      "Ability to work under pressure and in a fast-paced environment.",
      "Excellent communication and coordination skills with various teams.",
    ],
  },
  3:  {
          title: "Accountant",
          level: "Mid-level",
          location: "Cairo",
          country: "Egypt",
          description:"A contracting company is seeking a highly experienced and qualified accountant to join its team. The accountant will be responsible for managing financial accounts, dealing with government agencies, and ensuring compliance with financial laws and regulations.",
          specifications: ["Manage daily financial accounts and prepare periodic financial reports.","Deal with government agencies regarding follow-up on financial receivables and expense.","Prepare payment extracts and financial documents related to projects.","Ensure compliance with the company's financial policies and procedures."],
          qualifications:["Bachelor's degree in accounting, finance, or a related field.", "At least 3 years of experience in accounting, with experience in dealing with government agencies." , "Good knowledge of accounting and financial analysis software","Excellent negotiation skills and the ability to manage relationships with external parties.","Tactful and possesses strong communication skills","Ability to work under pressure and in a fast-paced environment.","Excellent communication and coordination skills with various teams."],
        },
  
  8: {
          title: "مهندس المكتب الفني",
          level: "المستوى المتوسط",
          location: "القاهرة",
          country: "مصر",
          description: "الوصف الوظيفي: إحدى شركات المقاولات الرائدة في مصر، تبحث عن مهندس مكتب فني ذي خبرة وكفاءة عالية للانضمام إلى فريقها. سيكون المهندس مسؤولاً عن",
          specifications: ["إعداد الرسومات الفنية وتفاصيل التنفيذ باستخدام برامج التصميم", "متابعة وإعداد شهادات الدفع الفنية والمالية للمشاريع.","التنسيق مع فرق الهندسة والتنفيذ والإدارة لضمان تنفيذ المشاريع وفقًا للخطط والمواصفات.","مراجعة الرسومات والوثائق الفنية للتأكد من الامتثال للمعايير والمواصفات.","إعداد تقارير فنية منتظمة عن تقدم المشروع. تقديم الدعم الفني خلال مراحل تنفيذ المشروع."],
          qualifications:["درجة البكالوريوس في الهندسة المعمارية أو الهندسة المدنية","خبرة لا تقل عن 5 سنوات في مجال المكتب الفني ضمن شركات المقولات","الكفاءة في برامج التصميم مثل AutoCAD و Revit","خبرة في إعداد ومتابعة شهادات الدفع الفنية والمالية","القدرة على العمل تحت الضغط وفي بيئة سريعة الخطى.","مهارات ممتازة في التواصل والتنسيق مع الفرق المختلفة."]
        },
  9: {
          title: "محاسب تكاليف",
          level: "خبير",
          location: "القاهرة",
          country: "مصر",
          description: "واحدة من شركات البناء الرائدة في مصر، تبحث عن محاسب تكاليف ذو خبرة ومهارة عالية للانضمام إلى فريقنا.",
          specifications: ["إعداد وتحليل ومراقبة تكاليف المشروع طوال مراحل التنفيذ.", "إعداد تقارير دورية عن التكاليف الفعلية مقارنة بالميزانيات المخطط لها.","مراقبة وتوثيق التكاليف المتعلقة بالمواد والعمالة والمعدات.","التنسيق مع فرق الشراء والمستودعات لضمان دقة بيانات التكلفة.","تحليل الفروق بين التكاليف الفعلية والمخطط لها وتقديم التوصيات لتحسين الكفاءة.","إعداد مستخلصات الدفع والمستندات المالية المتعلقة بالمشاريع.","ضمان الامتثال للسياسات والإجراءات المالية للشركة."],
          qualifications:["بكالوريوس في المحاسبة، التمويل، أو مجال ذي صلة.","خبرة لا تقل عن 5 سنوات في مجال محاسبة التكاليف، ويفضل في قطاع المقاولات.","معرفة جيدة ببرامج المحاسبة والتحليل المالي .","مهارات تحليلية قوية وقدرة على التعامل مع الأرقام بدقة.","القدرة على العمل تحت الضغط وفي بيئة سريعة الخطى.","مهارات ممتازة في التواصل والتنسيق مع الفرق المختلفة."]
        },
  10: {
    title: "محاسب",
          level: "المستوي المتوسط",
          location: "القاهرة",
          country: "مصر",
          description: "شركة مقاولات تبحث عن محاسب ذي خبرة وكفاءة عالية للانضمام إلى فريقها. سيكون المحاسب مسؤولاً عن إدارة الحسابات المالية، والتعامل مع الجهات الحكومية، وضمان الامتثال للقوانين واللوائح المالية.",
          specifications: ["إدارة الحسابات المالية اليومية وإعداد التقارير المالية الدورية.", "التعامل مع الجهات الحكومية فيما يتعلق بمتابعة المستحقات المالية والمصروفات.","إعداد مستخلصات الدفع والمستندات المالية المتعلقة بالمشاريع.","ضمان الامتثال للسياسات والإجراءات المالية للشركة."],
          qualifications:["بكالوريوس في المحاسبة، التمويل، أو مجال ذي صلة."," خبرة لا تقل عن 3 سنوات في مجال المحاسبة، مع خبرة في التعامل مع الجهات الحكومية","معرفة جيدة ببرامج المحاسبة والتحليل المالي .","مهارات ممتازة في التفاوض والقدرة على إدارة العلاقات مع الأطراف الخارجية.","لبق ويمتلك مهارات تواصل قوية","القدرة على العمل تحت الضغط وفي بيئة سريعة الخطى.","مهارات ممتازة في التواصل والتنسيق مع الفرق المختلفة."]
        },
};

function expandDiv(childNumber) {
  const children = document.querySelectorAll(".child");
  const popout = document.getElementById("popout");
  const popup = popout.querySelector(".popup");
  const overlay = document.getElementById("overlay");
  const parent = document.querySelector(".parent");
  const careersParent = document.querySelector(".carrers-parent");

  const job = jobData[childNumber];
  if (!job) {
    console.error("Job data not found for ID:", childNumber);
    return;
  }

  // Update popup content
  popup.querySelector(".pop_child1").textContent = job.title;
  popup.querySelector(".job_prop_child1").textContent = job.level;
  popup.querySelector(".job_prop_child2").textContent = job.location;
  popup.querySelector(".job_prop_child3").textContent = job.country;
  popup.querySelector(".pop_child3").textContent = job.description;

  // Handle lists
  const specsUl = popup.querySelector(".pop_ul");
  const qualsUl = popup.querySelector(".qualifications_ul");

  // Clear existing list items (except first one)
  while (specsUl.children.length > 1) specsUl.removeChild(specsUl.lastChild);
  while (qualsUl.children.length > 1) qualsUl.removeChild(qualsUl.lastChild);

  // Update list headers based on language
  const isArabic = document.documentElement.lang === "ar";
  specsUl.firstElementChild.textContent = isArabic
    ? "مواصفات الوظيفة:"
    : "Job Specification:";
  qualsUl.firstElementChild.textContent = isArabic
    ? "المؤهلات المطلوبة:"
    : "Job Qualifications:";

  // Add specifications
  job.specifications.forEach((spec) => {
    const li = document.createElement("li");
    li.textContent = spec;
    specsUl.appendChild(li);
  });

  // Add qualifications
  job.qualifications.forEach((qual) => {
    const li = document.createElement("li");
    li.textContent = qual;
    qualsUl.appendChild(li);
  });

  // Calculate and set height
  const expandedHeight = Math.max(
    careersParent.scrollHeight,
    document.querySelector(".child").scrollHeight + popout.scrollHeight
  );
  parent.style.height = `${expandedHeight}px`;
  careersParent.style.height = `${expandedHeight}px`;

  // Show popout and overlay
  children.forEach((child) => child.classList.add("shrink"));
  popout.classList.add("active");
  overlay.style.display = "block";
  overlay.style.zIndex = "9998";
}

function closePopout() {
  const children = document.querySelectorAll(".child");
  const popout = document.getElementById("popout");
  const overlay = document.getElementById("overlay");
  const parent = document.querySelector(".parent");
  const careersParent = document.querySelector(".carrers-parent");

  children.forEach((child) => child.classList.remove("shrink"));
  popout.classList.remove("active");
  overlay.style.display = "none";
  parent.style.height = "auto";
  careersParent.style.height = "auto";
}

// Set up popout closing
document.getElementById("overlay")?.addEventListener("click", closePopout);
document.getElementById("popout")?.addEventListener("click", function (e) {
  e.stopPropagation();
});

// Iframe functionality - Modified to handle all iframe containers
document.addEventListener('DOMContentLoaded', function() {
  // Handle all iframe containers
  const iframeContainers = document.querySelectorAll('.iframe-fallback');

  iframeContainers.forEach(container => {
    const iframe = container.querySelector('.lazy-iframe');
    const videoThumbnail = container.querySelector('.video-thumbnail');
    const playButton = container.querySelector('.play-button');

    // Only proceed if all elements exist
    if (iframe && videoThumbnail && playButton) {
      // Add click handler to each container
      container.addEventListener('click', function() {
        // Only load iframe if it hasn't been loaded yet
        if (!iframe.src) {
          iframe.src = iframe.getAttribute('data-src');
        }
        videoThumbnail.style.display = 'none';
        playButton.style.display = 'none';
        iframe.style.display = 'block';
      });

      // Initialize with iframe hidden
      iframe.style.display = 'none';
    }
  });

  // Intersection Observer for lazy loading when scrolled into view
  const lazyIframes = document.querySelectorAll('.lazy-iframe[data-src]');

  const iframeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const iframe = entry.target;
        if (!iframe.src) {
          iframe.src = iframe.getAttribute('data-src');
          observer.unobserve(iframe);
        }
      }
    });
  }, {
    rootMargin: '200px', // Load iframes when they're 200px from viewport
    threshold: 0.1
  });

  lazyIframes.forEach(iframe => {
    iframeObserver.observe(iframe);
  });
});