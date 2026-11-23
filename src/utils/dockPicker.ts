export interface DockPickerOptions {
  wrap: HTMLElement | null;
  defaultLabel?: string;
  resetLabel?: string;
  onClear?: () => void;
}

export interface DockPickerController {
  sync: () => void;
  close: () => void;
  destroy: () => void;
}

/**
 * Menambahkan pemilih dropdown kompak (.e3d-picker-wrap) ke .earth3d-dock
 * untuk layar sempit (<= 820px), sinkron penuh dengan .e3d-pill yang sudah ada.
 */
export function createDockPicker({
  wrap,
  defaultLabel = 'Bagian',
  resetLabel = 'Semua Bagian',
  onClear
}: DockPickerOptions): DockPickerController {
  const noop: DockPickerController = {
    sync: () => {},
    close: () => {},
    destroy: () => {}
  };
  if (!wrap) return noop;

  const dock = wrap.querySelector('.earth3d-dock');
  const pillsWrap = wrap.querySelector('.earth3d-layer-pills');
  if (!dock || !pillsWrap) return noop;

  const pills = Array.from(pillsWrap.querySelectorAll<HTMLButtonElement>('.e3d-pill'));
  if (!pills.length) return noop;

  const pickerWrap = document.createElement('div');
  pickerWrap.className = 'e3d-picker-wrap';

  const triggerBtn = document.createElement('button');
  triggerBtn.type = 'button';
  triggerBtn.className = 'e3d-picker-btn';
  triggerBtn.setAttribute('aria-haspopup', 'menu');
  triggerBtn.setAttribute('aria-expanded', 'false');
  triggerBtn.setAttribute('aria-label', `Pilih ${defaultLabel}`);
  triggerBtn.innerHTML = `
    <i class="e3d-picker-dot" aria-hidden="true"></i>
    <span class="e3d-picker-label">${defaultLabel}</span>
    <svg class="e3d-picker-caret" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>
  `;

  const menuEl = document.createElement('div');
  menuEl.className = 'e3d-picker-menu';
  menuEl.setAttribute('role', 'menu');
  menuEl.hidden = true;

  const itemBtns: HTMLButtonElement[] = pills.map((pill, idx) => {
    const labelText = pill.querySelector('span')?.textContent?.trim() || `${defaultLabel} ${idx + 1}`;
    const dotBg = (pill.querySelector('i') as HTMLElement | null)?.style.background || '#5266eb';
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'e3d-picker-item';
    item.setAttribute('role', 'menuitem');
    item.dataset.idx = String(idx);
    item.innerHTML = `<i style="background:${dotBg}"></i><span>${labelText}</span>`;
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      close();
      pill.click();
    });
    menuEl.appendChild(item);
    return item;
  });

  const resetItem = document.createElement('button');
  resetItem.type = 'button';
  resetItem.className = 'e3d-picker-item reset-item';
  resetItem.setAttribute('role', 'menuitem');
  resetItem.textContent = resetLabel;
  resetItem.hidden = true;
  resetItem.addEventListener('click', (e) => {
    e.stopPropagation();
    close();
    if (onClear) {
      onClear();
    } else {
      const activePill = pills.find((p) => p.classList.contains('active'));
      if (activePill) activePill.click();
    }
  });
  menuEl.appendChild(resetItem);

  pickerWrap.appendChild(triggerBtn);
  pickerWrap.appendChild(menuEl);
  pillsWrap.after(pickerWrap);

  const dotEl = triggerBtn.querySelector<HTMLElement>('.e3d-picker-dot');
  const labelEl = triggerBtn.querySelector<HTMLElement>('.e3d-picker-label');

  const close = () => {
    if (menuEl.hidden) return;
    menuEl.hidden = true;
    triggerBtn.setAttribute('aria-expanded', 'false');
    pickerWrap.classList.remove('open');
  };

  const toggle = (e: Event) => {
    e.stopPropagation();
    const nextOpen = menuEl.hidden;
    menuEl.hidden = !nextOpen;
    triggerBtn.setAttribute('aria-expanded', String(nextOpen));
    pickerWrap.classList.toggle('open', nextOpen);
  };

  const sync = () => {
    let activeIdx = -1;
    pills.forEach((pill, i) => {
      const isAct = pill.classList.contains('active');
      if (isAct) activeIdx = i;
      itemBtns[i]?.classList.toggle('active', isAct);
    });

    if (activeIdx >= 0) {
      const activePill = pills[activeIdx];
      const text = activePill.querySelector('span')?.textContent?.trim() || defaultLabel;
      const dotBg = (activePill.querySelector('i') as HTMLElement | null)?.style.background || '#5266eb';
      if (labelEl) labelEl.textContent = text;
      if (dotEl) {
        dotEl.style.background = dotBg;
        dotEl.classList.add('visible');
      }
      triggerBtn.classList.add('active');
      resetItem.hidden = false;
    } else {
      if (labelEl) labelEl.textContent = defaultLabel;
      if (dotEl) dotEl.classList.remove('visible');
      triggerBtn.classList.remove('active');
      resetItem.hidden = true;
    }
  };

  const onDocPointerDown = (e: Event) => {
    if (!menuEl.hidden && !pickerWrap.contains(e.target as Node)) {
      close();
    }
  };

  const onDocKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && !menuEl.hidden) {
      close();
      triggerBtn.focus();
    }
  };

  triggerBtn.addEventListener('click', toggle);
  document.addEventListener('pointerdown', onDocPointerDown);
  document.addEventListener('keydown', onDocKeyDown);
  sync();

  return {
    sync,
    close,
    destroy: () => {
      triggerBtn.removeEventListener('click', toggle);
      document.removeEventListener('pointerdown', onDocPointerDown);
      document.removeEventListener('keydown', onDocKeyDown);
    }
  };
}
