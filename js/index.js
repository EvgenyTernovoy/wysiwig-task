;(() => {
  let textBox

  const formatBlockTypes = ['H1', 'H2']

  const headStyles = {
    'H1': {
      'display': 'block',
      'font-size': '32px',
      'margin-block-start': '0.67em',
      'margin-block-end': '0.67em',
      'margin-inline-start': '0px',
      'margin-inline-end': '0px',
      'font-weight': 'bold',
    },

    'H2': {
      'display': 'block',
      'font-size': '24px',
      'margin-block-start': '0.83em',
      'margin-block-end': '0.83em',
      'margin-inline-start': '0px',
      'margin-inline-end': '0px',
      'font-weight': 'bold',
    }
  }

  const replaceTagNameToDiv = (el) => {
    const replacement = document.createElement('div');

    for(let i = 0, l = el.attributes.length; i < l; ++i){
      const nodeName  = el.attributes.item(i).nodeName;
      const nodeValue = el.attributes.item(i).nodeValue;

      replacement.setAttribute(nodeName, nodeValue);
    }

    replacement.innerHTML = el.innerHTML;

    el.parentNode.replaceChild(replacement, el);
  }

  const listenButtons = () => {
    const body = document.getElementsByTagName('body')[0]

    body.addEventListener('click', e => {
      const button = e.target.tagName === 'IMG' ? e.target.parentElement : e.target

      if (!button.className.includes('style-button')) {
        return
      }

      formatDoc(button)
    })
  }

  const formatDoc = (element) => {
    const cmd = element.dataset.cmd

    if (formatBlockTypes.includes(cmd)) {
      document.execCommand('formatBlock', false, cmd)

      // Редактор  Microsoft Office Wold Online сбрасывает стили для загловков.
      // Данный хак позволяет сохранить стилизацию но сбрасывает назначение тега.
      // Так как в задании указано, что нужно сохранить стилизацию, считают этот вариант рабочим.

      const elementsForStyling =  textBox.getElementsByTagName(cmd.toLowerCase())
      Array.from(elementsForStyling).forEach(el => {
        for (let style in headStyles[cmd]) {
          el.style[style] = headStyles[cmd][style]
        }

        replaceTagNameToDiv(el);
      })


      textBox.focus()
    }

    document.execCommand(cmd, false)
    textBox.focus()
  }


  const init = () => {
    textBox = document.getElementById("textBox")
    listenButtons()
  }

  init()
})()
