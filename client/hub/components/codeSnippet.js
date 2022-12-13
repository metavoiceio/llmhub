import Highlight, { defaultProps } from 'prism-react-renderer';
import nightOwl from 'prism-react-renderer/themes/nightOwl';
import { useState } from 'react';
import styles from '../styles/CodeSnippet.module.css'
import Confetti from 'react-dom-confetti'

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
}

const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

const Wrapper = (props) => <div style={{ position: "relative" }} {...props} />
const ConfettiWrapper = (props) => (
  <div style={{ position: "absolute", top: 0, right: 0 }} {...props} />
)

export default function CodeSnippet({ codeString, language }) {
  const [isCopied, setIsCopied] = useState(false);

  const copyButton = () => {
    return (
      <button
        style={{
          border: 'none',
          boxShadow: 'none',
          textDecoration: 'none',
          position: 'absolute',
          top: 0,
          right: 0,
          margin: '8px',
          padding: '8px 12px',
          background: '#E2E8F022',
          color: 'white',
          borderRadius: '8px',
          cursor: 'pointer',
          color: '#E2E8F0',
          fontSize: '14px',
          fontFamily: 'sans-serif',
          lineHeight: '1',
        }}
        onClick={() => {
          copyToClipboard(codeString)
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 3000)
        }}
      >
        {isCopied ? '🎉 Copied!' : 'Copy'}
      </button>
    )
  }

  return (
    <Wrapper>
      <Highlight
        {...defaultProps}
        code={codeString}
        theme={nightOwl}
        language={language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${styles.pre} bg-zinc-900`}>
            {copyButton()}
            {
              tokens.map((line, index) => (
                <div key={index} {...getLineProps({ line, key: index })}>
                  <span>{index + 1}</span>
                  <span className='p-4'>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                </div>
              ))
            }
          </pre>
        )}
      </Highlight>

      <ConfettiWrapper>
        <Confetti active={isCopied} config={config} />
      </ConfettiWrapper>
    </Wrapper>
  )
}