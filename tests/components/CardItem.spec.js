import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import CardItem from '@/components/CardItem.vue';

describe('CardItem.vue', () => {
  it('renders correctly with required props', () => {
    const wrapper = mount(CardItem, {
      props: {
        imageUrl: 'test url',
        name: 'Test Name',
        height: 180,
        weight: 75,
      },
    });

    expect(wrapper.find('.card-img').attributes('src')).toBe('test url');
    expect(wrapper.find('.card-header').text()).toBe('Name : Test Name');
  });


  it('matches snapshot', () => {
    const wrapper = mount(CardItem, {
      props: {
        imageUrl: 'https://example.com/image.jpg',
        name: 'Snapshot Test',
        height: 170,
        weight: 65,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
