import React, {useState, useEffect} from 'react';
import {
  Card,
  Tabs,
  Text,
  BlockStack,
  Checkbox,
  RangeSlider,
  TextField,
  SkeletonDisplayText
} from '@shopify/polaris';
import './style.css';

function TabSettings({settings, setSettings}) {
  const [selected, setSelected] = useState(0);
  const handleTabChange = selectedTabIndex => {
    setSelected(selectedTabIndex);
  };

  const tabs = [
    {id: 'display', content: 'Display', panelID: 'display-content'},
    {id: 'triggers', content: 'Triggers', panelID: 'triggers-content'}
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        {selected === 0 && <DisplaySettings settings={settings} setSettings={setSettings} />}
        {selected === 1 && <TriggersSettings settings={settings} setSettings={setSettings} />}
      </Tabs>
    </Card>
  );
}

function DisplaySettings({settings, setSettings}) {
  const positions = ['bottom-left', 'bottom-right', 'top-left', 'top-right'];

  const handleChange = field => value => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [field]: value
    }));
  };
  const handleChangePosition = position => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ['desktopPosition']: position
    }));
  };
  return (
    <BlockStack>
      <Text>Desktop Position</Text>
      <Card>
        <div className="desktop-position-options">
          {positions.map(pos => (
            <div
              key={pos}
              className={`desktop-position ${settings?.desktopPosition === pos ? 'selected' : ''}`}
              onMouseDown={() => handleChangePosition(pos)}
            >
              <div className={pos}>
                <SkeletonDisplayText size="small" />
              </div>
            </div>
          ))}
        </div>
        <Text>The display position of the pop on your website </Text>
      </Card>
      <Checkbox
        label="Hide time ago"
        checked={settings?.hideTimeAgo}
        onChange={handleChange('hideTimeAgo')}
      />
      <Checkbox
        label="Truncate content text"
        helpText="If your product name is long for one line, it will be truncated to 'Product na...'"
        checked={settings?.truncateContentText}
        onChange={handleChange('truncateContentText')}
      />
      <Text variant="subdued">TIMING</Text>
      <RangeSlider
        label="Display duration"
        value={settings?.displayDuration}
        onChange={handleChange('displayDuration')}
        min={1}
        max={10}
      />
      <RangeSlider
        label="Time before the first pop"
        value={settings?.timeBeforeFirstPop}
        onChange={handleChange('timeBeforeFirstPop')}
        min={0}
        max={30}
      />
      <RangeSlider
        label="Gap time between two pops"
        value={settings.gapTimeBetweenPops}
        onChange={handleChange('gapTimeBetweenPops')}
        min={1}
        max={10}
      />
      <RangeSlider
        label="Maximum of popups"
        value={settings?.maximumOfPopups}
        onChange={handleChange('maximumOfPopups')}
        min={1}
        max={80}
      />
    </BlockStack>
  );
}

// eslint-disable-next-line react/prop-types
function TriggersSettings({settings, setSettings}) {
  const handleChange = field => value => {
    // Use setSettings in a way that ensures it's always updating the latest state
    setSettings(prevSettings => ({
      ...prevSettings,
      [field]: value
    }));
  };

  return (
    <BlockStack>
      <Text variant="subdued">PAGES RESTRICTION</Text>
      <TextField
        label="Included pages"
        helpText="Page URLs to show the pop-up (separated by new lines)"
        multiline={4}
        value={settings.includedPages}
        onChange={handleChange('includedPages')}
      />
      <TextField
        label="Excluded pages"
        helpText="Page URLs NOT to show the pop-up (separated by new lines)"
        multiline={4}
        value={settings.excludedPages}
        onChange={handleChange('excludedPages')}
      />
    </BlockStack>
  );
}

export default TabSettings;
