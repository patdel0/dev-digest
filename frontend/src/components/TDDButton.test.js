import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import TDDButton from './TDDButton'

describe('tdd button', () => {
  beforeEach(()=> render(<TDDButton/>))

  it('renders the button', () => {
    const button = screen.getByTestId("tdd-button")
    expect(button.nodeName).toMatch(/button/i)
  })

  it('renders hello world by default', () => {
    const button = screen.getByTestId("tdd-button")
    expect(button.textContent).toMatch(/hello world/i)
  })


  it('changes the content when clicked', () => {
    const button = screen.getByTestId("tdd-button")

    fireEvent.click(button)
    expect(button.textContent).toMatch(/bye world/i)
  })

  it('contains the tablet-view class', () => {
    const button = screen.getByTestId("tdd-button")
    expect(button.classList.contains('tablet-view')).toBe(true)
  })
})
