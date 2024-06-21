import {
  LegacyCard,
  ResourceList,
  Avatar,
  ResourceItem,
  Text,
} from '@shopify/polaris';
import React, {useState} from 'react';

function TableComponent() {
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers'
  };

  const items = [
    {
      id: '106',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA'
    },
    {
      id: '206',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA'
    }
  ];

  return (
    <LegacyCard>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        sortValue={sortValue}
        sortOptions={[
          {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
          {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
        ]}
        onSortChange={function(selected) {
          setSortValue(selected);
        }}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
      />
    </LegacyCard>
  );

  function renderItem(item) {
    const {id, url, name, location, latestOrderUrl} = item;
    const media = <Avatar customer size="md" name={name} />;
    const shortcutActions = latestOrderUrl
      ? [{content: 'View latest order', url: latestOrderUrl}]
      : undefined;
    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={shortcutActions}
        persistActions
      >
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {name}
        </Text>
        <div>{location}</div>
      </ResourceItem>
    );
  }
}

export default TableComponent;
