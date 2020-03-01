function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('x-modal');
    modal.insertAdjacentHTML('afterBegin', `
    <div class="x-modal">
    <div class="modal-overlay">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title">Title here</span>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit, omnis?</p>
            </div>
            <div class="modal-footer">
                <button>Ok</button>
                <button>Cancel</button>
            </div>
        </div>
    </div>
</div>    
    `);
    document.body.appendChild(modal);
    return modal;
}

// options {title,closable,content, width} , destroy(), close windows
// setContent()
// onClose()
// onOpen()
// feforeClose()
// animate.css

$.modal = function (options) {
    const ANIMATION_SPEED = 200;
    const $modal = _createModal(options);
    let onClose = false;
    return {
        open() {
            !onClose && $modal.classList.add('open')
        },
        close() {
            onClose = true;
            $modal.classList.remove('open');
            setTimeout(() => {
                $modal.classList.add('hide');
                onClose = false;
            }, ANIMATION_SPEED)
        },
        destroy() {
        }
    }
};
