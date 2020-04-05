$.confirm = function (options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            content: options.content,
            width: '400px',
            ANIMATION_SPEED: '200',
            CLEAR_SPEED: '1000',
            closable: false,
            onClose: () => {
                modal.destroy();
            },
            footerButtons: [
                {
                    text: 'Ok', type: 'primary', handler: () => {
                        modal.close();
                        resolve();
                    }
                },
                {
                    text: 'Cancel', type: 'negative', handler: () => {
                        modal.close();
                        reject();
                    }
                }
            ]
        });
        modal.setHeader('bcg-red');
        setTimeout(() => modal.open(), 100)
    })
};

