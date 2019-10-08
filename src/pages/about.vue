<template>
  <f7-page id="about">
    <f7-navbar title="About" back-link="Back"></f7-navbar>
    <f7-block-title>About My App</f7-block-title>
    <f7-block strong>
      <div class="test">This is test!</div>
      <p>Here is About page!</p>
      <p>You can go <f7-link back>back</f7-link>.</p>
      <p>
        Mauris posuere sit amet metus id venenatis. Ut ante dolor, tempor nec commodo rutrum, varius at sem. Nullam ac
        nisi non neque ornare pretium. Nulla mauris mauris, consequat et elementum sit amet, egestas sed orci. In hac
        habitasse platea dictumst.
      </p>
      <p class="test-ellipsis">
        Fusce eros lectus, accumsan eget mi vel, iaculis tincidunt felis. Nulla tincidunt pharetra sagittis. Fusce in
        felis eros. Nulla sit amet aliquam lorem, et gravida ipsum. Mauris consectetur nisl non sollicitudin tristique.
        Praesent vitae metus ac quam rhoncus mattis vel et nisi. Aenean aliquet, felis quis dignissim iaculis, lectus
        quam tincidunt ligula, et venenatis turpis risus sed lorem. Morbi eu metus elit. Ut vel diam dolor.
      </p>
      <div class="hairline-border">text</div>
    </f7-block>
  </f7-page>
</template>

<style lang="scss">
#about {
  .test {
    background: rebeccapurple;
    font-size: px2rem(17px);
  }

  .test-ellipsis {
    @include multi-ellipsis(2);
  }
}

.hairline-border {
  box-shadow: 0 0 0 1px;
}

@media (min-resolution: 2dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.5px;
  }
}

@media (min-resolution: 3dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.33333333px;
  }
}

@media (min-resolution: 4dppx) {
  .hairline-border {
    box-shadow: 0 0 0 0.25px;
  }
}
</style>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class About extends Vue {
  private created() {}
}
</script>
