import React from 'react'
import { Link } from 'react-router-dom'
import * as ml5 from 'ml5'
import classes from './Edit.module.css'
import House from '../icons/House'
import useStoryStore from '../zustand/store'

export default function Edit() {

  const divRef = React.useRef()

  const story = useStoryStore((state) => state.story)
  const curIndex = useStoryStore((state) => state.curIndex)
  const setIndex = useStoryStore((state) => state.setIndex)
  const setStory = useStoryStore((state) => state.setStory)
    
  const [paraState, setParaState] = React.useState(0)
  const [tempText, setTempText] = React.useState('')
  const [tempText2, setTempText2] = React.useState('')
  const [paramModel, setParamModel] = React.useState('hemingway')
  const [paramLength, setParamLength] = React.useState(20)
  const [paramTemp, setParamTemp] = React.useState(0.5)
    
  const handlePrompt = () => {

    const _text = tempText
    
    const rnn = ml5.charRNN(`/${paramModel}/`, handleOnModelLoaded)

    function handleOnModelLoaded() {
      console.log('model loaded')
    }

    rnn.generate({
      seed: tempText,
      temperature: paramTemp,
      length: paramLength,
    }, (err, results) => {
      
      const tmp = results.sample.replace("\n", " ")
      
      setTempText(_text + tmp)
      setTempText2(_text)

    })

  }

  const handleReject = () => {

    const _text = tempText2

    setTempText(_text)
    setTempText2('')

  }

  const handleClear = () => {

    setTempText('')
    setTempText2('')

  }

  const handleTextChange = (e) => {
    setTempText(e.target.value)
    setTempText2('')
  }

  const handleAdd = () => {
    
    let _text = tempText
    
    let pars = []
    let lars = ''

    let flag = true
    while (flag){

      let n = _text.indexOf('.')

      if(n < 0) {

        n = _text.indexOf('?')

      }

      if(n >= 0) {  

        const tmp = _text.substr(0, n + 1)
        _text = _text.substr(n + 1)
        pars.push(tmp)

      } else {

        flag = false
        lars = _text

      }

    }

    const newpars = pars.join(" ")
    
    let _tmpStory = story.slice(0)

    let paraIndex = curIndex

    let _current_para = _tmpStory[paraIndex]
    _current_para.items.push(newpars)

    setStory(_tmpStory)

    setTempText(lars.trimStart())
    
    if(paraIndex === _tmpStory.length - 1) {

      divRef.current.scrollTop = divRef.current.scrollHeight

    }

  }

  const handleStart = () => {

    if(paraState > 0) {

      setIndex(-1)
      setParaState(0)

    } else {

      const _index = story.slice(0).length
      
      let _story = story.slice(0)
      _story.push({index: _index, items: []})

      setIndex(_index)
      setStory(_story)

      setParaState(1)

    }

  }

  const handleSelect = (index) => (e) => {
    
    setTempText('')
    setTempText2('')
    setIndex(index)
    setParaState(1)

  }

  return (
    <div className={classes.container}>
      <div className={classes.main}>
          <div className={classes.preview}>
            <div ref={divRef} className={classes.content}>
              {
                story.map((item, index) => {
                  return (
                    <p key={index} className={classes.text} onClick={handleSelect(index)}>
                    {
                      item.items.join(' ')
                    }
                    </p>
                  )
                })
              }
            </div>
          </div>
          <div className={classes.control}>
            <div className={classes.textPanel}>
              <textarea 
              className={classes.textArea} 
              placeholder='Write something'
              rows={3}
              value={tempText}
              onChange={handleTextChange}
              />
            </div>
            <div className={classes.controlPanel}>
              <div className={classes.buttonPanel}>
                <button 
                className={classes.button}
                onClick={handleStart}
                >{paraState === 0 ? "Start" : "Close"}</button>
              </div>
              <div className={classes.buttonPanel}>
                <button 
                disabled={curIndex < 0}
                className={classes.button} 
                onClick={handlePrompt}>Prompt</button>
                <button 
                disabled={curIndex < 0 || tempText2.length === 0} 
                className={classes.button}
                onClick={handleReject}>Reject</button>
                <button 
                disabled={curIndex < 0 || tempText.length === 0} 
                className={classes.button}
                onClick={handleClear}>Clear</button>
                <button 
                disabled={curIndex < 0 || tempText.length === 0} 
                className={classes.button}
                onClick={handleAdd}>Add</button>
              </div>
            </div>
            <div className={classes.optionPanel}>
              <div className={classes.selectPanel}>
                <label className={classes.label}>Model</label>
                <select 
                className={classes.select} 
                value={paramModel}
                onChange={(e) => setParamModel(e.target.value)}
                >
                  <option value="hemingway">Hemingway</option>
                  <option value="shakespeare">Shakespeare</option>
                </select>
              </div>
            </div>
            <div className={classes.panel}>
              <div className={classes.sliderPanel}>
                <label className={classes.label}>Length</label>
                <input 
                className={classes.range} 
                type="range" 
                min={1} 
                max={100} 
                value={paramLength}
                onChange={(e) => setParamLength(e.target.value)}
                />
                <label className={classes.value}>{ paramLength }</label>
              </div>
              <div className={classes.sliderPanel}>
                <label className={classes.label}>Temperature</label>
                <input 
                className={classes.range} 
                type="range" 
                min={0.01} 
                max={1} 
                step={0.01}
                value={paramTemp}
                onChange={(e) => setParamTemp(e.target.value)}
                />
                <label className={classes.value}>{ paramTemp }</label>
              </div>
            </div>
          </div>
      </div>
      <div className={classes.fab}>
          <Link to="/">
              <House color="#FCF8EC" />
          </Link>
      </div>
    </div>
  )
}