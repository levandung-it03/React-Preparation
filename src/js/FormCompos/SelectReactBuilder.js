import React from 'react';

const SLC_ENUM = {
  PROPS: { AUTO_COMPLETE: { OFF: "off", ON: "on" }, },
  FEATURES: { }
};

function insertProp(rootObj, name, value) {
  rootObj.props[name] = value;
  return rootObj;
}

function SelectReactBuilder() {
  return {
    props: {}, options: [], features: [],
    label(val) { return insertProp(this, 'label', val); },
    name(val) { return insertProp(this, 'name', val); },
    autoComplete(val) { return insertProp(this, 'autoComplete', val); },
    readOnly(val) { return insertProp(this, 'readOnly', val); },
    disabled(val) { return insertProp(this, 'disabled', val); },
    required(val) { return insertProp(this, 'required', val); },
    initValue(val) { this.initValue = val; return this; },
    addOption(optionObj) { this.options.push(optionObj); return this; },
    addOptions(optionObjs) { this.options.push(...optionObjs); return this; },
    moreFeaturesOnChange(callbacks) { this.features = callbacks; return this; },
    build() {
      const rootObj = this;
      //--Give TempCompo an uppercase name to serve react-rules.
      const Component = function ({ index }) {
        const callMoreFeatures = React.useCallback((e) => {
          
        }, []);

        React.useEffect(() => {
          if (rootObj.initValue != undefined) { //--Can take "" or 0.

          }
        }, []);

        return (
          <div className="form-select" name={rootObj.props.name}>
            <fieldset>
              <legend>{rootObj.props.label}</legend>
              <select {...rootObj.props} onChange={callMoreFeatures}>
                <option value="" selected>- Vui lòng chọn -</option>
                {rootObj.options.map((optionObj, index) => 
                  <option name={optionObj.name} key={index}>{optionObj.value}</option>
                )}
              </select>
            </fieldset>
          </div>
        );
      }
      return React.memo(Component);
    },
  };
};

export { SLC_ENUM, SelectReactBuilder }