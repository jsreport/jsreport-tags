
import handleHover from './utils/handleHover'
import Swatch from './Swatch'

const PickerSwatch = handleHover(({ hover, color, onClick }) => {
  const styles = {
    swatch: {
      width: '25px',
      height: '25px'
    }
  }

  if (hover) {
    styles.swatch = {
      ...styles.swatch,
      position: 'relative',
      zIndex: '2',
      outline: '2px solid #fff',
      boxShadow: '0 0 5px 2px rgba(0,0,0,0.25)'
    }
  }

  return (
    <div style={styles.swatch}>
      <Swatch color={color} onClick={onClick} />
    </div>
  )
})

const Picker = ({ width, colors, onChange, triangle }) => {
  const styles = {
    card: {
      width,
      background: '#fff',
      border: '1px solid rgba(0,0,0,0.2)',
      boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
      borderRadius: '4px',
      position: 'relative',
      padding: '5px',
      display: 'flex',
      flexWrap: 'wrap'
    },
    triangle: {
      position: 'absolute',
      border: '7px solid transparent',
      borderBottomColor: '#fff'
    },
    triangleShadow: {
      position: 'absolute',
      border: '8px solid transparent',
      borderBottomColor: 'rgba(0,0,0,0.15)'
    }
  }

  switch (triangle) {
    case 'hide':
      styles.triangle = { ...styles.triangle, display: 'none' }
      styles.triangleShadow = { ...styles.triangleShadow, display: 'none' }

      break

    case 'top-left':
      styles.triangle = { ...styles.triangle, top: '-14px', left: '10px' }
      styles.triangleShadow = { ...styles.triangleShadow, top: '-16px', left: '9px' }

      break

    case 'top-right':
      styles.triangle = { ...styles.triangle, top: '-14px', right: '10px' }
      styles.triangleShadow = { ...styles.triangleShadow, top: '-16px', right: '9px' }

      break
  }

  const handleChange = (hex, e) => onChange({ hex, source: 'hex' }, e)

  return (
    <div style={styles.card}>
      <div style={styles.triangleShadow} />
      <div style={styles.triangle} />
      {colors.map((c) => (
        <PickerSwatch color={c} key={c} onClick={handleChange} />
      ))}
    </div>
  )
}

Picker.defaultProps = {
  width: '200px',
  colors: [
    '#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76',
    '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3',
    '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6'
  ],
  triangle: 'top-left'
}

export default Picker
