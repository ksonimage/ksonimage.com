export function initArchiveTabs() {
  const tabBtns = Array.from(document.querySelectorAll('.category-tab-btn'));
  const categoryGroups = Array.from(document.querySelectorAll('.category-group'));

  if (tabBtns.length === 0 || categoryGroups.length === 0) return;

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-category-target');

      // 모든 버튼 스타일 초기화 (기본 text-dark)
      tabBtns.forEach((b) => {
        b.classList.remove('text-primary', 'font-bold');
        b.classList.add('text-dark');
      });

      // 클릭한 버튼 활성화 (글자 색상 및 볼드 강조)
      btn.classList.add('text-primary', 'font-bold');
      btn.classList.remove('text-dark');

      // 선택한 카테고리 그룹만 노출
      categoryGroups.forEach((group) => {
        if (group.id === `category-group-${targetCategory}`) {
          group.classList.remove('hidden');
          group.classList.add('block');
        } else {
          group.classList.remove('block');
          group.classList.add('hidden');
        }
      });
    });
  });
}

// 일반 페이지 로드 및 Astro View Transitions 대응
document.addEventListener('astro:page-load', initArchiveTabs);
if (document.readyState === 'complete') {
  initArchiveTabs();
} else {
  document.addEventListener('DOMContentLoaded', initArchiveTabs);
}
