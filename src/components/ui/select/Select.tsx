import { FC, useEffect, useLayoutEffect } from 'react'
import ReactSelect, {OnChangeValue} from 'react-select'
import makeAnimated from 'react-select/animated'
import { IOption, ISelect } from './select.interface'
import formStyles from '../form-element/form.module.scss'
import styles from './Select.module.scss'

const animatedComponents = makeAnimated()

const Select: FC<ISelect> = ({
	placeholder,
	error,
	isMulti,
	options,
	field,
	isLoading,
}) => {
	const onChange = (newValue: OnChangeValue<IOption, boolean>) => {
		field.onChange(
			isMulti
				? (newValue as IOption[]).map((item: IOption) => item.value)
				: (newValue as IOption).value
		)
	}

	const getValue = () => {
		if (field.value) {
			return options.filter((option) => field.value.indexOf(option.value) >= 0)
		} else {
			return isMulti ? [] : ('' as any)
		}
	}
	return (
		<div className={styles.selectContainer}>
			<label>
				<span>{placeholder}</span>
				<ReactSelect
					classNamePrefix="custom-select"
					placeholder={''}
					options={options}
					value={getValue()}
					onChange={onChange}
					isMulti={isMulti}
					components={animatedComponents}
					isLoading={isLoading}
				/>
			</label>
			{error && <div className={formStyles.error}>{error.message}</div>}
		</div>
	)
}

export default Select