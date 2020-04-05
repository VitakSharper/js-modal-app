Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
};

const noop = () => {
};

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) return document.createElement('div');

    const wrap = document.createElement('div');
    wrap.classList.add('modal-window__footer');
    buttons.forEach(btn => {
        const $btn = document.createElement('button');
        $btn.textContent = btn.text;
        $btn.classList.add('ui');
        $btn.classList.add(btn.type || 'secondary');
        $btn.classList.add('basic');
        $btn.classList.add('button');
        $btn.onclick = btn.handler || noop();

        wrap.appendChild($btn);
    });

    return wrap;
}

function _createModal(options) {
    const DEFAULT_WIDTH = '600px';
    const modal = document.createElement('div');
    modal.classList.add('x-modal');
    modal.insertAdjacentHTML("afterBegin", `
    <div class="modal-overlay">
        <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
            <div class="modal-window__header" data-header="true">
                <span class="modal-window__title" data-title="true">${options.title || 'Window'}</span>
                ${options.closable
        ? `<span class="modal-window__close" data-close="true">&times;</span>`
        : ''}
            </div>
            <div class="modal-window__body" data-content>
                ${options.content || 'No content'}
            </div>            
        </div>
    </div>    
    `);
    const footer = _createModalFooter(options.footerButtons);
    footer.appendAfter(modal.querySelector('[data-content]'));
    document.body.appendChild(modal);
    return modal;
}


$.modal = function (options) {

    let onClose = false;
    let destroyed = false;
    let $modal = _createModal(options);

    const modal = {
        open() {
            if (destroyed) return;
            !onClose && $modal.classList.add('open')
        },
        close() {
            onClose = true;
            setTimeout(() => {
                $modal.classList.add('hide');
                onClose = false;
            }, options.ANIMATION_SPEED);
            setTimeout(() => {
                $modal.classList.remove('open');
                $modal.classList.remove('hide');
                if (typeof options.onClose === 'function') options.onClose();
            }, options.CLEAR_SPEED)
        }
    };

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    };

    $modal.addEventListener('click', listener);
    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal);
            $modal.removeEventListener('click', listener);
            destroyed = true;
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html;
        },
        setTitle(html) {
            $modal.querySelector('[data-title]').innerHTML = html;
        },
        setHeader(className) {
            $modal.querySelector('[data-header]').classList.add(className);
        }
    })
};
